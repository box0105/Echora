import Select from 'react-select';

    const storeOptions = [
        { value: "", label: "請選擇" },  
        { value: "台北店", label: "台北店" },
        { value: "台中店", label: "台中店" },
        { value: "高雄店", label: "高雄店" }
      ];


const StoreSelector = ({ selectedStore, setSelectedStore }) => {
  return (
    <div className="c-addr gap-2 py-3">
<Select
  className="c-addselect w-100 inputse"
  options={storeOptions}
  value={storeOptions.find(option => option.value === selectedStore)}
  onChange={(selectedOption) => setSelectedStore(selectedOption.value)}
  menuPortalTarget={document.body} // 让菜单在更高层级渲染
  styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} // 确保 z-index 够高
/>

    </div>
  );
};

export default StoreSelector;