import React, { useRef, useState } from 'react';
import { ArrowLeft, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/input';
import { Checkbox } from '../../src/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { addEmis, addOneShotEmis, getEmis } from '../../../Redux_store/api/EmisApiStore';
import { useParams } from 'react-router-dom';

const baseSchema = {
  grandTotal: z
    .number({ invalid_type_error: 'Grand Total is required' })
    .min(1, 'Grand Total must be greater than 0'),
  discount: z
    .number({ invalid_type_error: 'Discount amount is required' })
    .min(0, 'Discount cannot be negative'),
};

const emiSchema = z.object({
  ...baseSchema,
  paymentType: z.literal('Pay in EMIs'),
  emiCount: z
    .number({ invalid_type_error: 'EMI Count is required' })
    .min(1, 'EMI Count must be at least 1'),
  startDate: z.string().nonempty('Start date is required'),
  endDate: z.string().nonempty('End date is required'),
});

const oneShotSchema = z.object({
  ...baseSchema,
  paymentType: z.literal('Pay in One Shot'),
  dueDate: z.string().nonempty('Due date is required'),
  remark: z
    .string()
    .min(3, 'Remark must be at least 3 characters')
    .max(100, 'Remark must be under 100 characters'),
});

const PaymentSchema = z.discriminatedUnion('paymentType', [emiSchema, oneShotSchema]);

const Add_Payment = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.emis);
  const { studentId } = useParams();
  const dueInputRef = useRef(null);
  const startInputRef = useRef(null);
  const endInputRef = useRef(null);

  const [selected, setSelected] = useState('Pay in EMIs');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      grandTotal: 0,
      discount: 0,
      paymentType: 'Pay in EMIs',
      emiCount: 1,
      startDate: '',
      endDate: '',
      dueDate: '',
      remark: '',
    },
  });

  const onSubmit = async (data) => {
    const emiData = {
      student_id: parseInt(studentId) || 101,
      amount: data.grandTotal,
      ...(data.paymentType === 'Pay in EMIs' && {
        emi_discount: data.discount,
        emi_number: data.emiCount,
        start_date: data.startDate,
        end_date: data.endDate,
      }),
      ...(data.paymentType === 'Pay in One Shot' && {
        emi_discount: data.discount,
        due_date: data.dueDate,
        remark: data.remark,
      }),
    };

    try {
      if (data.paymentType === 'Pay in EMIs') {
        await dispatch(addEmis(emiData)).unwrap();
      } else {
        await dispatch(addOneShotEmis(emiData)).unwrap();
      }
      await dispatch(getEmis({ filter: 'missed', month: 3, year: 2025 }));
    } catch (err) {
      console.error(`Failed to add ${data.paymentType}:`, err);
    }
  };
  const goback = () => { window.history.back() }

  return (
    <div>

      <div className='m-4'>
        <Button onClick={goback}> <ArrowLeft />Back </Button>
      </div>
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10">
        <h2 className="text-4xl font-bold text-center text-blue-500 mb-8">
          Setup Payment
        </h2>


        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Grand Total */}
          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-800">
              Grand Total <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              placeholder="₹"
              className="w-full h-14 text-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
              {...register('grandTotal', { valueAsNumber: true })}
            />
            <p className="text-red-500 text-sm mt-1">{errors.grandTotal?.message}</p>
          </div>

          {/* Payment Type Selector */}
          <div className="flex flex-wrap gap-4">
            {['Pay in EMIs', 'Pay in One Shot'].map((type) => (
              <div
                key={type}
                className={`flex items-center gap-3 px-5 py-3 border rounded-xl shadow-sm cursor-pointer transition-all ${selected === type ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                  }`}
              >
                <Checkbox
                  id={type}
                  checked={selected === type}
                  onCheckedChange={() => {
                    setSelected(type);
                    setValue('paymentType', type, { shouldValidate: true });
                  }}
                />
                <label
                  htmlFor={type}
                  className="text-base font-medium text-gray-700 cursor-pointer"
                  onClick={() => {
                    setSelected(type);
                    setValue('paymentType', type, { shouldValidate: true });
                  }}
                >
                  {type}
                </label>
              </div>
            ))}
          </div>

          {/* Conditional Fields */}
          {selected === 'Pay in EMIs' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium mb-1 text-gray-700">Discount Amount</label>
                <Input
                  type="number"
                  placeholder="Enter Amount"
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                  {...register('discount', { valueAsNumber: true })}
                />
                <p className="text-red-500 text-sm mt-1">{errors.discount?.message}</p>
              </div>

              <div>
                <label className="block text-lg font-medium mb-1 text-gray-700">EMI Count *</label>
                <Input
                  type="number"
                  placeholder="Number of EMIs"
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                  {...register('emiCount', { valueAsNumber: true })}
                />
                <p className="text-red-500 text-sm mt-1">{errors.emiCount?.message}</p>
              </div>

              <div>
                <label className="block text-lg font-medium mb-1 text-gray-700">Start Date *</label>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    startInputRef.current?.showPicker();
                  }}
                  className="w-full justify-between text-gray-700"
                >
                  {watch('startDate') ? format(new Date(watch('startDate')), 'dd/MM/yyyy') : 'Pick a date'}
                  <CalendarIcon className="w-5 h-5 ml-2" />
                </Button>
                <Input
                  type="date"
                  ref={startInputRef}
                  className="absolute opacity-0 -z-10"
                  onChange={(e) =>
                    setValue('startDate', e.target.value, { shouldValidate: true })
                  }
                />
                <p className="text-red-500 text-sm mt-1">{errors.startDate?.message}</p>
              </div>

              <div>
                <label className="block text-lg font-medium mb-1 text-gray-700">End Date *</label>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    endInputRef.current?.showPicker();
                  }}
                  className="w-full justify-between text-gray-700"
                >
                  {watch('endDate') ? format(new Date(watch('endDate')), 'dd/MM/yyyy') : 'Pick a date'}
                  <CalendarIcon className="w-5 h-5 ml-2" />
                </Button>
                <Input
                  type="date"
                  ref={endInputRef}
                  className="absolute opacity-0 -z-10"
                  onChange={(e) =>
                    setValue('endDate', e.target.value, { shouldValidate: true })
                  }
                />
                <p className="text-red-500 text-sm mt-1">{errors.endDate?.message}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium mb-1 text-gray-700">Discount Amount</label>
                <Input
                  type="number"
                  placeholder="Enter Amount"
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                  {...register('discount', { valueAsNumber: true })}
                />
                <p className="text-red-500 text-sm mt-1">{errors.discount?.message}</p>
              </div>

              <div>
                <label className="block text-lg font-medium mb-1 text-gray-700">Due Date *</label>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    dueInputRef.current?.showPicker();
                  }}
                  className="w-full justify-between text-gray-700"
                >
                  {watch('dueDate') ? format(new Date(watch('dueDate')), 'dd/MM/yyyy') : 'Pick a date'}
                  <CalendarIcon className="w-5 h-5 ml-2" />
                </Button>
                <Input
                  type="date"
                  ref={dueInputRef}
                  className="absolute opacity-0 -z-10"
                  onChange={(e) =>
                    setValue('dueDate', e.target.value, { shouldValidate: true })
                  }
                />
                <p className="text-red-500 text-sm mt-1">{errors.dueDate?.message}</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-lg font-medium mb-1 text-gray-700">Remark</label>
                <Input
                  type="text"
                  placeholder="Course Fee"
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                  {...register('remark')}
                />
                <p className="text-red-500 text-sm mt-1">{errors.remark?.message}</p>
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          <div className="mt-6 text-center">
            <Button
              type="submit"
              disabled={loading}
              className="w-50  bg-blue-500 text-white text-lg font-semibold py-3 rounded-xl shadow-md transition-all"
            >
              {loading ? 'Processing...' : 'Proceed To Payment'}
            </Button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default Add_Payment;
