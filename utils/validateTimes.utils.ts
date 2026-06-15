export const validateTimings = (timings: { start: string; end: string }[]) => {
  for (let i = 0; i < timings.length; i++) {
    const current = timings[i];

    // Start should be before end
    if (current.start >= current.end) {
      return `Slot ${i + 1}: Start time must be before end time`;
    }

    const currentStart = convertToMinutes(current.start);
    const currentEnd = convertToMinutes(current.end);

    for (let j = i + 1; j < timings.length; j++) {
      const next = timings[j];

      const nextStart = convertToMinutes(next.start);
      const nextEnd = convertToMinutes(next.end);

      // Check overlap
      if (currentStart < nextEnd && currentEnd > nextStart) {
        return `Slot ${i + 1} overlaps with Slot ${j + 1}`;
      }
    }
  }

  return null;
};

const convertToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};
