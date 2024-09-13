export function convertTimeToMinutes(timeString: string): number {
    const [hours, minutes] = timeString.split(":").map(Number);

    if (isNaN(hours) || isNaN(minutes) || hours < 0 || minutes < 0 || minutes >= 60) {
        throw new Error("Invalid time format");
    }
    
    return hours * 60 + minutes;
}

function convertMinutesToTime(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60).toString().padStart(2, "0");
    const minutes = (totalMinutes % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}


export function createSlots(startTime: string, endTime: string, slotDuration: number) {
    const startMinutes = convertTimeToMinutes(startTime);
    const endMinutes = convertTimeToMinutes(endTime);

    const slots = [];

    let currentStart = startMinutes;

    while (currentStart + slotDuration <= endMinutes) {
        const currentEnd = currentStart + slotDuration;
        slots.push({
            start: convertMinutesToTime(currentStart),
            end: convertMinutesToTime(currentEnd),
        });
        currentStart = currentEnd;
    }

    return slots;
}