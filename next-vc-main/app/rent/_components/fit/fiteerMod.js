import SortMod from './SortMod';
import BrandMod from './BrandMod';
import AddressMod from './AddressMod';
import LevelMod from './LevelMod';
import ColorMod from './ColorMod';
import FilterButtonsMod from './FilterButtonsMod';

const FilterSidebar = ({ setIsOpen, onKeyPressHandler }) => (
  <div className="col-12 col-md-3 d-flex flex-column c-lerf-mod c-filter-scroll">
    <SortMod setIsOpen={setIsOpen} onKeyPressHandler={onKeyPressHandler} />
    <BrandMod />
    <AddressMod />
    <LevelMod />
    <ColorMod />
    <FilterButtonsMod />
  </div>
);

export default FilterSidebar;
