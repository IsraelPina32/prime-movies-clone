
export const formatRuntime = (runtimeStr: string | undefined): string => {
    if(!runtimeStr || runtimeStr === "N/A") return '--';

    const totalMinutes = parseInt(runtimeStr.replace(/\D/g, ''), 10);

    if(isNaN(totalMinutes)) return runtimeStr;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes} min`;

    return `${hours} h ${minutes} min`;
}