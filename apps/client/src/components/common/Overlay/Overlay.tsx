interface OverlayProps {
  onClick?(): void;
}

const Overlay = ({ onClick }: OverlayProps) => {
  return (
    <div
      onClick={onClick}
      role="none"
      className="fixed inset-0 h-screen w-screen bg-black/30 z-40"
    />
  );
};

export default Overlay;
