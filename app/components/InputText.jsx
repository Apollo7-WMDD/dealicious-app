import { useStore } from "../../lib/context/sidebar_context/store";

function InputText() {
  const filter = useStore((state) => state.filter);
  const setFilter = useStore((state) => state.setFilter);

  return (
    <>
      <input
        type="text"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        className="text-red-700"
      />
    </>
  );
}

export default InputText;
