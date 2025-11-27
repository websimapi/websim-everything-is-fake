const room = new WebsimSocket();

export const collectionName = 'user_galleries_v1';

export function getRoom() {
    return room;
}

export async function getCurrentUserRecord() {
    const user = await window.websim.getCurrentUser();
    const records = room.collection(collectionName).filter({ created_by_username: user.username }).getList();
    
    // Since getList might be empty initially if not loaded, or genuinely empty
    // We rely on the caller to handle initialization if needed
    // However, for immediate action, we can try to find it.
    
    // Better approach: fetch all and find by creator id to be safe, 
    // but filter by created_by_username is supported by WebsimSocket implicitly via record ownership usually? 
    // Actually WebsimSocket filter works on fields. We don't have created_by_username field by default unless we add it.
    // BUT, we can filter by nothing and find in js for the current user since there won't be millions of users in this demo.
    // Wait, documentation says: "You can only update and delete records created by yourself."
    // So we can find our own record by iterating.
    
    const allRecords = room.collection(collectionName).getList();
    const myRecord = allRecords.find(r => r.username === user.username);
    return myRecord;
}

export async function initUserRecord() {
    const user = await window.websim.getCurrentUser();
    // Wait a brief moment for initial sync
    await new Promise(r => setTimeout(r, 500)); 
    
    let allRecords = room.collection(collectionName).getList();
    let myRecord = allRecords.find(r => r.username === user.username);

    if (!myRecord) {
        try {
            await room.collection(collectionName).create({
                assets: [],
                last_updated: new Date().toISOString()
            });
            console.log("Created new user gallery record");
        } catch (e) {
            console.error("Error creating record:", e);
        }
    }
}

export async function addAssetToUser(asset) {
    let record = await getCurrentUserRecord();
    if (!record) {
        // Try creating one if it doesn't exist
        await initUserRecord();
        // retry get
        record = await getCurrentUserRecord();
    }
    
    if (record) {
        const newAssets = [...(record.assets || []), asset];
        await room.collection(collectionName).update(record.id, {
            assets: newAssets,
            last_updated: new Date().toISOString()
        });
        return true;
    }
    return false;
}

export function subscribeToFeed(callback) {
    return room.collection(collectionName).subscribe((records) => {
        // Flatten all assets from all users
        let allAssets = [];
        records.forEach(record => {
            if (record.assets && Array.isArray(record.assets)) {
                record.assets.forEach(asset => {
                    allAssets.push({
                        ...asset,
                        author: record.username,
                        authorId: record.id, // using record id as proxy for user grouping
                        authorAvatar: `https://images.websim.com/avatar/${record.username}`
                    });
                });
            }
        });
        
        // Sort by timestamp descending
        allAssets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        callback(allAssets);
    });
}