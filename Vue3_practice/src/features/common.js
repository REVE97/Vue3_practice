const padZero = (num) => String(num).padStart(2,"0");

const formatDate = (date, includeTime = false) => {
    const yyyy = date.getFullYear();
    const MM = padZero(date.getMonth() + 1);
    const dd = padZero(date.getDate());
    let formattedDate = `${yyyy}-${MM}-${dd}`;

    if(includeTime) {
        const hh = padZero(date.getHours());
        const mm = padZero(date.getMinutes());
        const ss = padZero(date.getSeconds());
        formattedDate += ` ${hh}:${mm}:${ss}`;
    }

    return formattedDate;
}

export const getNow = () => formatDate(new Date(), true);

export const getDate = (dateString) => formatDate(new Date(dateString)); 