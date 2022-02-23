export const formatURL = (base) => {
    return (base.startsWith('//') ? "https:" + base : base).replace();
}