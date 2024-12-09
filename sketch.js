function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(30, 30, 30); // Fondo oscuro
  let spacing = 40; // Espaciado entre los elementos
  let maxSize = 20; // Tamaño máximo de los elementos

  for (let x = spacing; x < width; x += spacing) {
    for (let y = spacing; y < height; y += spacing) {
      // Distancia del mouse al centro del elemento
      let distance = dist(mouseX, mouseY, x, y);
      // Calcula el tamaño basado en la distancia
      let size = map(distance, 0, width / 2, maxSize, 5);
      size = constrain(size, 4, maxSize); // Limita el tamaño

      // Factor de transformación círculo-cuadrado
      let transform = map(distance, 0, width / 2, 1, 0);
      transform = constrain(transform, 0, 1); // Asegura valores entre 0 y 1

      // Color dinámico
      fill(map(x, 0, width, 100, 255), map(y, 0, height, 50, 200), 200);

      // Dibujo de elemento con transformación
      push(); // Guarda el estado de transformación
      translate(x, y); // Mueve el punto de referencia
      rectMode(CENTER); // Dibuja rectángulos desde el centro
      // Interpola entre círculo y cuadrado
      beginShape();
      for (let i = 0; i < 360; i += 45) {
        let angle = radians(i);
        let x =
          cos(angle) * size * (1 - transform) + cos(angle) * size * transform;
        let y =
          sin(angle) * size * (1 - transform) + sin(angle) * size * transform;
        vertex(x, y);
      }
      endShape(CLOSE);
      pop(); // Restaura el estado de transformación
    }
  }
}
