const ColorFilter = ({ onChange, selectedColors }) => {
    const colors = [
      { name: 'Ebony', src: '/images/Rent/color-images/black.svg' },
      { name: 'Sky Blue', src: '/images/Rent/color-images/lightblue.svg' },
      { name: 'Dark Blue', src: '/images/Rent/color-images/darkblue.svg' },
      { name: 'Modern Purple', src: '/images/Rent/color-images/purple.svg' },
      { name: 'Fire Red', src: '/images/Rent/color-images/red.svg' },
      { name: 'Golden Yellow', src: '/images/Rent/color-images/yellow.svg' },
      { name: 'Tangerine', src: '/images/Rent/color-images/orange.svg' },
      { name: 'Brown', src: '/images/Rent/color-images/brown.svg' },
      { name: 'Dark Brown', src: '/images/Rent/color-images/dark-brown.svg' },
      { name: 'Marble White', src: '/images/Rent/color-images/white.svg' },
      { name: 'Slate Gray', src: '/images/Rent/color-images/grey.svg' },
      { name: 'Forest Green', src: '/images/Rent/color-images/green.svg' },

    ];
  
    return (
      <div className="color">
        <div className="color-title pb-4">
          <div className="h5 c-lenav">顏色</div>
        </div>
        <div className="c-filter-color d-flex flex-wrap gap-2">
          {colors.map((color) => (
            <img
              key={color.name}
              src={color.src}
              alt={color.name}
              className={`color-img ${selectedColors.includes(color.name) ? 'selected' : ''}`}
              onClick={() => onChange(color.name)}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default ColorFilter;
  