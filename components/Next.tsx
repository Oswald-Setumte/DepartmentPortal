type Props = {
  handleSubmit: (onSubmit: () => void) => {};
};

export default function next({ handleSubmit }: Props) {
  return (
    <button
      type="submit"
      onClick={() => handleSubmit}
      className="bg-[#0a2540] text-white h-10 w-20"
    >
      Next
    </button>
  );
}
