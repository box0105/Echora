const RentAddressFilter = ({ onChange, selectedAddresses }) => (
    <div className="rent title">
      <div className="h5 c-lenav">租借地址</div>
      <div className="address-check pt-3">
        {['台北店', '台中店', '高雄店'].map((address) => (
          <div key={address} className="ch-1 d-flex pb-4">
            <div className="form-check mb-0">
              <input
                className="form-check-input focus-ring"
                type="checkbox"
                id={address}
                checked={selectedAddresses.includes(address)}  // 判断当前地址是否被选中
                onChange={() => onChange(address)}  // 更新筛选条件
                style={{ '--bsFocusRingColor': 'rgba(var(--white), 0)' }}
              />
              <label className="form-check-label" htmlFor={address}>
                <h6 className="h6">{address}</h6>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  export default RentAddressFilter;
  