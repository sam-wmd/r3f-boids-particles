function smoothstep(progress:number) {
    // Clamp t to [0, 1]
    progress = Math.max(0, Math.min(1, progress));
    return progress * progress * (3 - 2 * progress);
}

export function interpolatePoint(startX:number, startY:number, endX:number, endY:number, progress:number) {
    const smoothT = smoothstep(progress);
    return {
        x: startX + (endX - startX) * smoothT,
        y: startY + (endY - startY) * smoothT
    };
}