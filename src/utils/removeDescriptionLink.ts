const removeDescriptionLink = (description: string) => {
  const removeLinkRegex = /\n*\s*<iframe.*?\\?>.*?<\/iframe\\?>\s*\n*/gi;
  return description.replace(removeLinkRegex, "").replace("href", "alt");
};

export { removeDescriptionLink };
