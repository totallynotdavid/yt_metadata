module.exports = {
  /*
    Options: 'default', 'medium', 'high', 'standard', 'maxres'
    Have in mind that not all media has all the available sizes.
    In case the preferred size is not available, the next available size will be used.
  */
  preferredThumbnailSize: 'standard',
  // You can change the order of the fallback sizes if you want to for your use cases.
  thumbnailFallbackOrder: ['maxres', 'standard', 'high', 'medium', 'default'],
};