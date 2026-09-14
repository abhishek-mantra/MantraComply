interface CountrySwitcherProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
}

export function CountrySwitcher({ selectedCountry, onCountryChange }: CountrySwitcherProps) {
  const countries = [
    { code: 'us', label: '🇺🇸 United States', flag: '🇺🇸' },
    { code: 'uk', label: '🇬🇧 United Kingdom', flag: '🇬🇧' },
    { code: 'canada', label: '🇨🇦 Canada', flag: '🇨🇦' },
    { code: 'australia', label: '🇦🇺 Australia', flag: '🇦🇺' },
    { code: 'uae', label: '🇦🇪 UAE', flag: '🇦🇪' },
  ];

  return (
    <div className="mb-8 pb-6 border-b border-gray-200">
      <div className="mb-3">
        <p className="text-sm text-gray-500 italic">🌍 Dev Mode — Select Country Form</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {countries.map((country) => (
          <button
            key={country.code}
            onClick={() => onCountryChange(country.code)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCountry === country.code
                ? 'bg-[#2563EB] text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
            }`}
          >
            {country.label}
          </button>
        ))}
      </div>
    </div>
  );
}
