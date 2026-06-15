const toMinutes = (time: string): number => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const toTime = (minutes: number): string => {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
};

const generateSlots = (
  availability: { start: string; end: string }[],
  duration: number,
  bookedSlots: { startTime: string; endTime: string }[],
  allowLessThanDuration = true,
) => {
  const result = [];

  const booked = bookedSlots
    .map((b) => ({
      start: toMinutes(b.startTime),
      end: toMinutes(b.endTime),
    }))
    .sort((a, b) => a.start - b.start);

  for (const period of availability) {
    console.log("Generating slots for period:", period);
    let current = toMinutes(period.start);
    const end = toMinutes(period.end);

    while (current < end) {
      const activeBooking = booked.find(
        (b) => current >= b.start && current < b.end,
      );

      if (activeBooking) {
        result.push({
          start: toTime(current),
          end: toTime(activeBooking.end),
          isBooked: true,
        });

        current = activeBooking.end;
        continue;
      }

      const nextBooking = booked.find((b) => b.start > current);

      let slotEnd = current + duration;

      // 🔥 handle gap before booking
      if (nextBooking && nextBooking.start < slotEnd) {
        const gap = nextBooking.start - current;

        if (!allowLessThanDuration && gap < duration) {
          // skip small slot
          current = nextBooking.start;
          continue;
        }

        slotEnd = nextBooking.start;
      }

      // handle end boundary
      if (slotEnd > end) {
        if (!allowLessThanDuration) break;
        slotEnd = end;
      }

      // skip small end slot if not allowed
      if (!allowLessThanDuration && slotEnd - current < duration) {
        break;
      }

      result.push({
        start: toTime(current),
        end: toTime(slotEnd),
        isBooked: false,
      });

      current = slotEnd;
    }
  }

  return result;
};

export { generateSlots };
