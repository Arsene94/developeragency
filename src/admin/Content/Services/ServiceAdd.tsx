import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import { SingleValueProps, OptionProps } from 'react-select';
import { MuiIcon } from "../../../icons/MuiIcons.tsx";
import AsyncSelect from "react-select/async";
import '@syncfusion/ej2-base/styles/tailwind.css';
import '@syncfusion/ej2-icons/styles/tailwind.css';
import '@syncfusion/ej2-buttons/styles/tailwind.css';
import '@syncfusion/ej2-splitbuttons/styles/tailwind.css';
import '@syncfusion/ej2-inputs/styles/tailwind.css';
import '@syncfusion/ej2-lists/styles/tailwind.css';
import '@syncfusion/ej2-navigations/styles/tailwind.css';
import '@syncfusion/ej2-popups/styles/tailwind.css';
import '@syncfusion/ej2-dropdowns/styles/tailwind.css';
import '@syncfusion/ej2-react-richtexteditor/styles/tailwind.css';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { registerLicense } from '@syncfusion/ej2-base';

interface IconOption {
  value: string;
  label: string;
  name: string;
  provider: 'mui' | 'lucide';
}

const ServiceAdd: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
  const [formData, setFormData] = useState<{
    title: string;
    short_description: string;
    description: string;
    icon: IconOption | null;
    status: 'active' | 'inactive';
  }>({
    title: '',
    short_description: '',
    description: '',
    icon: null,
    status: 'active',
  });
  registerLicense('Ngo9BigBOggjHTQxAR8/V1NNaF5cXmBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWXlec3VRR2deUkZ1V0pWYUA=');

  const loadOptions = async (inputValue: string): Promise<IconOption[]> => {
    const res = await fetch(`http://localhost:5002/api/icons/all?q=${encodeURIComponent(inputValue)}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data.icons.map((icon: IconOption) => ({
      label: icon.name,
      value: icon.name,
      name: icon.name,
      provider: icon.provider,
    }));
  };

  const renderIcon = (provider: string, name: string) => {
    if (provider === 'mui') {
      return <MuiIcon icon={name} size="small" style={{ marginRight: 8 }} />;
    }
    return null;
  };

  const CustomSingleValue = (props: SingleValueProps<IconOption>) => {
    const { data } = props;
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {renderIcon(data.provider, data.name)}
          {data.name}
        </div>
    );
  };

  const CustomOption = (props: OptionProps<IconOption>) => {
    const { data, innerRef, innerProps } = props;
    return (
        <div ref={innerRef} {...innerProps} style={{ display: 'flex', alignItems: 'center', padding: 8 }}>
          {renderIcon(data.provider, data.name)}
          {data.name}
        </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch('http://localhost:5002/api/service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/zjadminwebarcats/content/services', {
          state: { successMessage: `Serviciul ${formData.title} a fost creat cu succes!` },
        });
      } else {
        alert(data.error || 'Eroare la crearea serviciului.');
      }
    } catch (err) {
      console.error('Eroare la trimiterea formularului:', err);
      alert('A apărut o eroare la trimiterea formularului.');
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Adaugă Serviciu Nou</h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titlu
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descriere Scurtă
              </label>
              <RichTextEditorComponent value={formData.short_description} onChange={(value: string) =>
                  setFormData({ ...formData, short_description: value })
              }>
                <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
              </RichTextEditorComponent>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descriere Detaliată
              </label>
              <div className="syncfusion-rte-wrapper">
              <RichTextEditorComponent value={formData.description} onChange={(value: string) =>
                  setFormData({ ...formData, description: value })
              }>
                <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
              </RichTextEditorComponent>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon (Mui Icon Name)
              </label>
              <AsyncSelect<IconOption, false>
                  cacheOptions
                  defaultOptions
                  value={formData.icon}
                  classNamePrefix="icon-select"
                  getOptionLabel={(e) => e.label}
                  getOptionValue={(e) => e.value}
                  onChange={(selected) => {
                    setFormData({ ...formData, icon: selected ?? null });
                  }}
                  loadOptions={loadOptions}
                  components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                  placeholder="Search icons..."
              />

              <p className="mt-1 text-sm text-gray-500">
                Exemplu: Globe, ShoppingCart, LayoutGrid, Settings, etc.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="active">Activ</option>
                <option value="inactive">Inactiv</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/zjadminwebarcats/content/services')}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center gap-2"
            >
              <X size={20} />
              Anulează
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 flex items-center gap-2"
            >
              <Save size={20} />
              Salvează
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceAdd;
