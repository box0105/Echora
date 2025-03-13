import Select from 'react-select';

    const storeOptions = [
        { value: "", label: "請選擇" },  
        { value: "台北店", label: "台北店" },
        { value: "台中店", label: "台中店" },
        { value: "高雄店", label: "高雄店" }
      ];


const StoreSelector = ({ selectedStore, setSelectedStore }) => {
  return (
    <div className="c-addr gap-2 ">
<Select
  className="c-addselect w-100 inputse"
  options={storeOptions}
  value={storeOptions.find(option => option.value === selectedStore)}
  onChange={(selectedOption) => setSelectedStore(selectedOption.value)}
  menuPortalTarget={document.body} // 让菜单在更高层级渲染
  styles={{
    control: (base) => ({
      ...base,
      fontSize: '12px'  // 修改默认值字体大小
    }),
    singleValue: (base) => ({
      ...base,
      fontSize: '16px'  // 仅针对选中值（默认值）字体大小
    })
  }}
/>

    </div>
  );
};

export default StoreSelector;