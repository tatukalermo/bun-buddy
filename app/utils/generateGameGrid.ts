type gridCell = {
    x: number;
    y: number;
    groundType: "default" | "blocked";
  };
  
  export const generateGameGrid: (size: number) => gridCell[] = (size = 3) => {
    const grid: gridCell[] = [];
  
    for (let i = 0; i < size * size; i++) {
      const row = (i % size) + 1;
      const col = Math.floor(i / size) + 1;
  
      grid.push({ x: col, y: row, groundType: "default" });
    }
    
    return grid;
  };
  