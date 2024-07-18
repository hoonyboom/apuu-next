"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/useToast";
import { GOAL, LEVEL, MEMBER_SIZE, PERIOD, STYLE } from "@/lib/const";
import { cn } from "@/lib/utils";
import { enumValuesMap, registerFormSchema } from "@/lib/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePickerProps, RegisterCheckBoxProps, RegisterFormFieldProps } from "./types";

export default function RegisterForm({ children }: PropsWithChildren) {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  });
  const { toast } = useToast();

  const onSubmit = (data: z.infer<typeof registerFormSchema>) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>기본 정보를 입력해주세요</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <RegisterFormSelectBox form={form} label="모집 종류" name="sort" />
            <RegisterFormSelectBox form={form} label="교류 방식" name="method" />
            <RegisterFormSelectBox
              form={form}
              label="모집 인원"
              name="size"
              values={MEMBER_SIZE}
            />
            <RegisterFormSelectBox
              form={form}
              label="진행 기간"
              name="period"
              values={PERIOD}
            />
            <RegisterFormCheckBox
              form={form}
              label="모집 수준"
              name="level"
              values={LEVEL}
            />
            <RegisterFormCheckBox
              form={form}
              label="메인 영법"
              name="style"
              values={STYLE}
            />
            <RegisterFormCheckBox
              form={form}
              label="훈련 목표"
              name="goal"
              values={GOAL}
            />
            <DatePicker form={form} />

            <CardTitle className="mt-10">모임에 대해 소개해주세요</CardTitle>
            {children}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

const RegisterFormSelectBox = ({ form, name, label, values }: RegisterFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value?.toString() ?? ""}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {enumValuesMap[name]
                ? enumValuesMap[name].map(value => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))
                : values?.map(value => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const RegisterFormCheckBox = ({ form, name, values, label }: RegisterCheckBoxProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel>{label}</FormLabel>
          </div>
          {values.map(item => (
            <FormField
              key={item}
              control={form.control}
              name={name}
              render={({ field }) => {
                return (
                  <FormItem
                    key={item}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item)}
                        onCheckedChange={checked => {
                          return checked
                            ? field.onChange(field.value?.push(item))
                            : field.onChange(
                                field.value?.filter(value => value !== item),
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{item}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
        </FormItem>
      )}
    />
  );
};

const DatePicker = ({ form }: DatePickerProps) => {
  return (
    <FormField
      control={form.control}
      name="deadline"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>모집 마감일</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>마감일을 선택해주세요</span>
                  )}
                  <CalendarIcon className="ml-auto size-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={date => {
                  const today = new Date();
                  const thirtyDaysFromNow = new Date();
                  thirtyDaysFromNow.setDate(today.getDate() + 30);

                  return date < today || date > thirtyDaysFromNow;
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
