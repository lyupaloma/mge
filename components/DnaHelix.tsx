// Анимированная 3D двойная спираль ДНК на чистом CSS (без three.js / WebGL).
// Каждая «перекладина» вращается вокруг вертикальной оси со сдвигом фазы —
// получается эффект вращающейся спирали. Декоративный элемент.

const RUNGS = 14;

export function DnaHelix() {
  return (
    <div className="dna-helix" aria-hidden="true">
      {Array.from({ length: RUNGS }).map((_, i) => (
        <div
          key={i}
          className="dna-rung"
          style={{ animationDelay: `${(-i * 4) / RUNGS}s` }}
        >
          <span className="dna-node dna-node--gold" />
          <span className="dna-bar" />
          <span className="dna-node dna-node--blue" />
        </div>
      ))}
    </div>
  );
}
