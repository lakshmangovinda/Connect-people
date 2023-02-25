export const uniqueUserId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

export const convertingIntoChild = (val) =>
val.filter(({ isParent }) => isParent === true)
.map(({ name, id, friendsList }) => ({
  name,
  id,
  children: friendsList.map((friendId) => {
    const friend = val.find(({ id }) => id === friendId);
    return {
      name: friend.name,
      id: friend.id,
      children: friend.friendsList.filter((fid) => fid !== id)
        .map((fid) => {
          const ffriend = val.find(({ id }) => id === fid);
          return {
            name: ffriend.name,
            id: ffriend.id,
          };
        })
    };
  })
}));