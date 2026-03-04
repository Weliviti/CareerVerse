# Profile Picture Upload - Fixes & Testing Guide

## 🔧 Issues Fixed

### Issue 1: Direct Avatar Upload Not Persisting
**Problem:** Clicking profile image to upload → image shows but disappears on refresh
**Root Cause:** `userData` state wasn't being updated, only `avatarUrl` was set
**Fix:** Now updates both `avatarUrl` AND `userData.profile_picture_url` states

### Issue 2: Edit Profile Photo Upload
**Problem:** Photo upload through edit modal not working properly
**Fix:** Added detailed logging and ensured proper data flow from upload → backend → state update

### Issue 3: Confusing Error Messages
**Problem:** Success/error messages not clear
**Fix:** 
- Added specific error messages with details
- Shows "Profile picture updated successfully!" on success
- Shows detailed error messages on failure (with actual error from backend)

### Issue 4: State Synchronization
**Problem:** State not syncing properly between components
**Fix:** 
- Added `reloadUserData()` function to refresh from Firestore
- Improved `handleProfileSave` to merge updates properly
- Added comprehensive console logging for debugging

---

## ⚠️ CRITICAL: Deploy Storage Rules First!

Before testing, you **MUST** deploy the Firebase Storage rules, otherwise uploads will fail with "Permission Denied".

### Deploy via Firebase Console (Recommended):
1. Go to https://console.firebase.google.com/
2. Select your project
3. Click **Storage** in left menu
4. Click **Rules** tab
5. Replace everything with this:

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    
    // Avatar uploads - users can upload/update their own avatar
    match /avatars/{userId}/{fileName} {
      // Allow authenticated users to read any avatar
      allow read: if request.auth != null;
      
      // Allow users to write only their own avatar
      allow write: if request.auth != null 
                   && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024  // Max 5MB
                   && request.resource.contentType.matches('image/.*');  // Images only
    }
    
    // Deny all other access
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

6. Click **Publish** button
7. Wait 1-2 minutes for rules to propagate

### OR Deploy via Firebase CLI:
```bash
firebase deploy --only storage
```

---

## 🧪 Testing Steps

### Test 1: Direct Avatar Upload (Click on Profile Picture)
1. **Open browser console** (F12) to see logs
2. Go to Profile page
3. Click on the profile picture circle
4. Select an image (max 5MB, JPG/PNG)
5. **Expected console logs:**
   ```
   Starting avatar upload...
   File uploaded to storage
   Got download URL: https://...
   Backend updated: {success: true, data: {...}}
   User data reloaded: {...}
   ```
6. **Expected UI:**
   - Green toast: "Profile picture updated successfully!"
   - Image shows immediately
7. **Refresh page** - image should still be there ✅

### Test 2: Edit Profile Modal Upload
1. Click **"Edit Profile"** button
2. In the modal, click **"Choose Photo"**
3. Select an image
4. Image preview should appear
5. Click **"Save Changes"**
6. **Expected console logs:**
   ```
   Uploading photo from edit form...
   Photo uploaded to storage
   Got download URL: https://...
   Sending update to backend: {name: ..., career_path: ..., profile_picture_url: ...}
   Backend response: {success: true, data: {...}}
   Profile saved, updating local state: {...}
   ```
7. **Expected UI:**
   - Green toast: "Profile updated successfully!"
   - Modal closes
   - New image shows in profile
8. **Refresh page** - image should persist ✅

### Test 3: Error Scenarios

#### A. File Too Large
1. Try uploading image > 5MB
2. **Expected:** Red toast: "File size must be less than 5MB"

#### B. Wrong File Type
1. Try uploading PDF or other non-image
2. **Expected:** Red toast: "Please select an image file"

#### C. Not Authenticated
1. If user is logged out (shouldn't happen, but test)
2. **Expected:** Red toast: "Failed to upload... [auth error]"

#### D. Storage Rules Not Deployed
1. If rules not deployed yet
2. **Expected:** Red toast: "Failed to upload profile picture: [permission error]"
3. **Console shows:** "Avatar upload error: FirebaseError: storage/unauthorized"
4. **Solution:** Deploy storage rules!

---

## 🔍 Debugging

### If Upload Still Fails:

1. **Check Console Logs**
   - Open F12 → Console tab
   - Look for red errors
   - Share full error message if asking for help

2. **Check Network Tab**
   - F12 → Network tab
   - Try upload
   - Look for failed requests (red)
   - Check the response for error details

3. **Verify Storage Rules**
   - Firebase Console → Storage → Rules
   - Make sure they match the rules above
   - Click "Publish" again if unsure

4. **Check Firebase Storage**
   - Firebase Console → Storage → Files
   - See if files are actually being uploaded
   - Path should be: `avatars/{your-uid}/profile.jpg`

5. **Check Firestore**
   - Firebase Console → Firestore Database
   - Find your user document: `users/{your-uid}`
   - Check if `profile_picture_url` field exists and has URL

### Common Issues:

| Symptom | Cause | Solution |
|---------|-------|----------|
| "Permission denied" | Storage rules not deployed | Deploy rules via console |
| Image disappears on refresh | Backend not updating Firestore | Check console logs, verify backend is running |
| "Failed to upload" generic | Network issue or backend down | Check if backend is running on correct port |
| Image corrupted | File format issue | Try different image, ensure JPG/PNG |

---

## 📝 Code Changes Summary

### Files Modified:
1. `frontend/src/pages/Profile.jsx`
   - Enhanced `handleAvatarUpload` with state updates
   - Added `reloadUserData()` function
   - Improved `handleProfileSave()`
   - Added detailed console logging

2. `frontend/src/components/ProfileEditForm.jsx`
   - Enhanced `handleSubmit` with logging
   - Better error handling
   - Improved state management

### Files Created:
3. `storage.rules` - Firebase Storage security rules
4. `firebase.json` - Firebase configuration
5. `firestore.indexes.json` - Firestore indexes

---

## ✅ Success Checklist

- [ ] Storage rules deployed to Firebase
- [ ] Backend server is running
- [ ] Logged in as authenticated user
- [ ] Can upload image directly (click profile picture)
- [ ] Image persists after page refresh
- [ ] Can upload via Edit Profile modal
- [ ] File size validation works (5MB limit)
- [ ] File type validation works (images only)
- [ ] Success toast appears on successful upload
- [ ] Error toast appears with helpful message on failure

---

## 🆘 Still Having Issues?

If you're still experiencing problems after following this guide:

1. **Share console logs** - Copy full error from browser console
2. **Share network errors** - Screenshot of failed network requests
3. **Verify checklist** - Confirm all items in success checklist
4. **Check backend logs** - See if backend is receiving requests

The changes are now committed and ready to test!
