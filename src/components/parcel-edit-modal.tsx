import React, { EventHandler, useContext, useState } from 'react';
import ParcelForm from '@/components/form-parts/parcel-form';
import { deepEqual, isNone } from '@/lib/helper';
import InputField from '@/components/generic/input-field';
import CheckBoxField from '@/components/generic/checkbox-field';
import { NotificationType, ParcelTemplateType } from '@/lib/types';
import { ParcelMutationContext, ParcelTemplateInput } from '@/context/parcel-template-mutation';
import Notifier, { Notify } from '@/components/notifier';
import { Loading } from '@/components/loader';
import ButtonField from './generic/button-field';
import { CreateParcelTemplateInput, UpdateParcelTemplateInput } from '@purplship/graphql';

const DEFAULT_TEMPLATE_CONTENT = {
  parcel: {
    packaging_type: "envelope",
    weight_unit: 'KG',
    dimension_unit: 'CM'
  }
} as ParcelTemplateType;

type OperationType = {
  parcelTemplate?: ParcelTemplateType;
  onConfirm: () => Promise<any>;
};
type ParcelEditContextType = {
  editParcel: (operation: OperationType) => void,
};

export const ParcelEditContext = React.createContext<ParcelEditContextType>({} as ParcelEditContextType);

interface ParcelEditModalComponent { }

const ParcelEditModal: React.FC<ParcelEditModalComponent> = ({ children }) => {
  const { notify } = useContext(Notify);
  const { setLoading, loading } = useContext(Loading);
  const { createParcelTemplate, updateParcelTemplate } = useContext(ParcelMutationContext);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [key, setKey] = useState<string>(`parcel-${Date.now()}`);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [template, setTemplate] = useState<ParcelTemplateInput | undefined>();
  const [operation, setOperation] = useState<OperationType | undefined>();
  const [isValid, setIsValid] = React.useState<boolean>(true);

  const editParcel = (operation: OperationType) => {
    setIsActive(true);
    setOperation(operation);
    setIsNew(isNone(operation.parcelTemplate));
    setTemplate((operation.parcelTemplate || DEFAULT_TEMPLATE_CONTENT) as ParcelTemplateInput);
    setKey(`parcel-${Date.now()}`);
  };
  const close = (_?: React.MouseEvent, changed?: boolean) => {
    if (isNew) setTemplate(undefined);
    if (changed && operation?.onConfirm !== undefined) operation?.onConfirm();
    setLoading(false);
    setIsActive(false);
    setOperation(undefined);
    setKey(`parcel-${Date.now()}`);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    const { id, label, is_default, parcel } = template as ParcelTemplateInput;
    e.preventDefault();
    try {
      setLoading(true);
      if (isNew) {
        await createParcelTemplate({ label, is_default, parcel } as CreateParcelTemplateInput);
        notify({ type: NotificationType.success, message: 'Parcel successfully added!' });
      }
      else {
        await updateParcelTemplate({ id, label, is_default, parcel } as UpdateParcelTemplateInput);
        notify({ type: NotificationType.success, message: 'Parcel successfully updated!' });
      }
      setTimeout(() => close(undefined, true), 1500);
    } catch (message: any) {
      notify({ type: NotificationType.error, message });
      setLoading(false);
    }
  };

  return (
    <Notifier>
      <ParcelEditContext.Provider value={{ editParcel }}>
        {children}
      </ParcelEditContext.Provider>

      <div className={`modal ${isActive ? "is-active" : ""}`} key={key}>
        <div className="modal-background" onClick={close}></div>
        <div className="modal-card">

          <form className="modal-card-body" onSubmit={handleSubmit} onChange={e => setIsValid((e.target as any).checkValidity())}>
            <div className="form-floating-header p-4">
              <h3 className="subtitle is-3">{isNew ? 'New' : 'Update'} Parcel</h3>
            </div>
            <div className="p-3 my-5"></div>

            {template !== undefined &&
              <ParcelForm
                value={template.parcel}
                onChange={(parcel: any) => setTemplate({ ...template, parcel })}
                prefixChilren={<>
                  <div className="columns mb-0 px-2">
                    <InputField
                      label="label"
                      name="label"
                      onChange={e => setTemplate({ ...template, label: e.target.value })}
                      defaultValue={template.label}
                      className="is-small"
                      fieldClass="column mb-0 px-1 py-2"
                      required
                    />
                  </div>
                  <div className="columns mb-1 px-1">
                    <CheckBoxField
                      name="is_default"
                      onChange={e => setTemplate({ ...template, is_default: e.target.checked })}
                      defaultChecked={template?.is_default}
                      fieldClass="column mb-0 px-2 pt-3 pb-0">
                      <span>Set as default parcel</span>
                    </CheckBoxField>
                  </div>
                </>}>

                <div className="p-3 my-5"></div>
                <ButtonField type="submit"
                  className={`is-primary ${loading ? 'is-loading' : ''} m-0`}
                  fieldClass="form-floating-footer p-3"
                  controlClass="has-text-centered"
                  disabled={!isValid || deepEqual(template, DEFAULT_TEMPLATE_CONTENT)}>
                  <span>Save</span>
                </ButtonField>
              </ParcelForm>}
          </form>

        </div>

        <button className="modal-close is-large has-background-dark" aria-label="close" onClick={close}></button>
      </div>
    </Notifier>
  )
};

export default ParcelEditModal;
