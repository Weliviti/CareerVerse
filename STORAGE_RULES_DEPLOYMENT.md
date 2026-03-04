# Firebase Storage Rules Deployment Guide

## 📋 Overview
The storage rules have been configured to allow profile picture uploads while maintaining security.

## 🔒 Storage Rules Summary

### Avatar Uploads (`/avatars/{userId}/{fileName}`)
- ✅ **Read**: Any authenticated user (to view profile pictures)
- ✅ **Write**: Only the user who owns the avatar (uid must match)
- ✅ **Constraints**:
  - Max file size: 5MB
  - Only image files allowed (`image/*`)

### All Other Paths
- ❌ **Read/Write**: Blocked by default

## 🚀 Deploy Rules to Firebase

### Option 1: Firebase Console (Manual)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Storage** → **Rules**
4. Copy the content from `storage.rules` file
5. Click **Publish**

### Option 2: Firebase CLI (Recommended)
```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if not done yet)
firebase init

# Deploy only storage rules
firebase deploy --only storage

# Or deploy all rules at once
firebase deploy --only firestore,storage
```

## ✅ Testing the Rules

### Test Avatar Upload
```javascript
// This should work: User uploading their own avatar
const storageRef = ref(storage, `avatars/${auth.currentUser.uid}/profile.jpg`);
await uploadBytes(storageRef, file);

// This should work: Reading any user's avatar
const url = await getDownloadURL(storageRef);

// This should FAIL: User trying to upload to another user's folder
const otherUserRef = ref(storage, `avatars/other-user-id/profile.jpg`);
await uploadBytes(otherUserRef, file); // ❌ Permission denied
```

## 📝 Files Created
- `storage.rules` - Firebase Storage security rules
- `firebase.json` - Firebase project configuration
- `firestore.indexes.json` - Firestore indexes configuration

## ⚠️ Important Notes
1. **Must deploy** these rules to Firebase before testing profile picture uploads
2. Rules are set to allow authenticated users only
3. File size limit is 5MB per avatar
4. Only image files are allowed
5. Users can only modify their own avatars but can view others' avatars

## 🔧 Troubleshooting

### "Permission denied" error when uploading
- Ensure user is authenticated (`auth.currentUser` exists)
- Check that upload path matches: `avatars/{currentUserId}/...`
- Verify token hasn't expired
- Make sure rules are deployed

### "File too large" error
- Max file size is 5MB
- Add validation in frontend before upload

### Rules not taking effect
- Wait 1-2 minutes after deployment
- Clear browser cache
- Re-authenticate the user
