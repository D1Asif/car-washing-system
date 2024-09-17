"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSlots = exports.convertTimeToMinutes = void 0;
function convertTimeToMinutes(timeString) {
    var _a = timeString.split(":").map(Number), hours = _a[0], minutes = _a[1];
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || minutes < 0 || minutes >= 60) {
        throw new Error("Invalid time format");
    }
    return hours * 60 + minutes;
}
exports.convertTimeToMinutes = convertTimeToMinutes;
function convertMinutesToTime(totalMinutes) {
    var hours = Math.floor(totalMinutes / 60).toString().padStart(2, "0");
    var minutes = (totalMinutes % 60).toString().padStart(2, "0");
    return hours + ":" + minutes;
}
function createSlots(startTime, endTime, slotDuration) {
    var startMinutes = convertTimeToMinutes(startTime);
    var endMinutes = convertTimeToMinutes(endTime);
    var slots = [];
    var currentStart = startMinutes;
    while (currentStart + slotDuration <= endMinutes) {
        var currentEnd = currentStart + slotDuration;
        slots.push({
            start: convertMinutesToTime(currentStart),
            end: convertMinutesToTime(currentEnd),
        });
        currentStart = currentEnd;
    }
    return slots;
}
exports.createSlots = createSlots;
