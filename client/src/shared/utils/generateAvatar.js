const stringToColor = function stringToColor(str) {
    let hash = 0;
    let color = '#';
    let value;

    if(!str) return color + '333333';
        

    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    for (let i = 0; i < 3; i++) {
        value = (hash >> (i * 13)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }

    return color;
};

export const generateAvatar = userName => stringToColor(userName);