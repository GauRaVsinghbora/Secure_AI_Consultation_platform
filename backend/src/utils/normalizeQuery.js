export const normalizeQuery = (text) => {
    const cleaned = text
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .trim();

    const words = cleaned.split(" ");

    // ❌ useless starting phrases
    const ignoreStart = [
        "i", "have", "had", "am", "feeling", "feel",
        "suddenly", "started", "start", "been"
    ];

    // remove useless starting words
    let filtered = words.filter(word => !ignoreStart.includes(word));

    // if everything removed → fallback to original words
    if (filtered.length === 0) filtered = words;

    // take first 3 meaningful words
    return filtered.slice(0, 3).join(" ");
};