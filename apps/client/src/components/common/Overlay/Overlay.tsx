interface OverlayProps {
  onClick?(): void;
}

const Overlay = ({ onClick }: OverlayProps) => {
  return (
    <div
      onClick={onClick}
      role="none"
      className="fixed inset-0 h-screen w-screen bg-black/30"
    />
  );
};

export default Overlay;
