import React from 'react'
import { Button } from '../../src/components/ui/Button'
import '/src/component/Login/Login.css'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
// import { Button } from '../../src/components/ui/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../src/components/ui/form';
import { Input } from '../../src/components/ui/input';
import { Label } from '../../src/components/ui/label';
import { Checkbox } from '../../src/components/ui/checkbox';
const FormSchema = z.object({
  Code: z.string().min(1, 'Code is required'),
});

const Login = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Code: '',
    },
  });
  const onSubmit = (data) => {
    // Handle form submission
    console.log('Form data:', data);
    // Uncomment and replace with your toast implementation
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  };
  return (
    <div>
      <div className='main grid grid-cols-2'>
        <div className='circle col-span-1'>
          <div className="circle col-span-1 flex justify-center items-center h-full">
            <div className="text-4xl font-bold text-white animate-wordReveal">
              Welcome to Intellix
            </div>
          </div>

        </div>
        <div className=' col-span-1 ml-9 mt-9'>
          <div>
            <h3 className='text-5xl font-serif pt-9 text-center'>Welcome  Administrator!</h3>
            <p className='text-gray-400 pt-3 text-center'>Enter your credentials to access the admin dashboard. </p>
          </div>
          <div className=' mt-12'>
            <h1 className='font-sans text-gray-800 font-bold text-4xl flex justify-center'>Login</h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6 "
              >
                <div className='m-8'><FormField
                  control={form.control}
                  name="Code"
                  render={({ field }) => (
                    <FormItem className="form_feild">
                      <FormLabel >Enter School Code</FormLabel>
                      <FormControl>
                        <Input className="w-full input_feild" placeholder="Please Enter Your Code" type="number" {...field} />
                      </FormControl>
                      <div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="terms" />
                          <Label htmlFor="terms">Accept terms and conditions</Label>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                /></div>
                <div className='submit'>

                  <Button className='bg-blue-500' type="submit">Submit</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
