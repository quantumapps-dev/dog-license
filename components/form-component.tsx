// eslint-disable-next-line @typescript-eslint/ban-ts-comment 

// @ts-nocheck 
 "use client";

import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, FormSchema } from "@/schemas/formSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Popover } from "@/components/ui/popover";
import { PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export function FormComponent() {
  const [step, setStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: "onTouched",
  });

  const ownerFields = [
    "ownerName",
    "ownerEmail",
    "ownerPhone",
    "addressLine1",
    "city",
    "state",
    "zip",
  ] as const;

  const dogFields = [
    "dogName",
    "breed",
    "sex",
    "dob",
    "weightLbs",
    "spayedNeutered",
    "microchipped",
    "chipId",
    "rabiesVaccinationDate",
    "rabiesCertificateUrl",
  ] as const;

  const licenseFields = ["licenseType", "licenseDuration", "agreeTerms"] as const;

  const handleNext = async () => {
    const fieldsToValidate = step === 0 ? ownerFields : step === 1 ? dogFields : licenseFields;
    const valid = await form.trigger(Array.from(fieldsToValidate));
    if (valid) setStep((s) => Math.min(2, s + 1));
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...values,
        dob: values.dob?.toISOString(),
        rabiesVaccinationDate: values.rabiesVaccinationDate?.toISOString(),
      } as unknown as FormData;

      await new Promise((res) => setTimeout(res, 800));
      console.log("Franklin County Dog License Application:", payload);
      form.reset();
      setStep(0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 max-w-2xl">
        <h2 className="text-lg font-semibold">Franklin County, PA — Dog License Application</h2>

        {step === 0 && (
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="ownerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} aria-invalid={!!form.formState.errors.ownerName} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ownerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} aria-invalid={!!form.formState.errors.ownerEmail} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ownerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="5551234567" {...field} aria-invalid={!!form.formState.errors.ownerPhone} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} aria-invalid={!!form.formState.errors.addressLine1} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Chambersburg" {...field} aria-invalid={!!form.formState.errors.city} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="PA" maxLength={2} {...field} aria-invalid={!!form.formState.errors.state} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP</FormLabel>
                    <FormControl>
                      <Input placeholder="17201" {...field} aria-invalid={!!form.formState.errors.zip} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="dogName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dog name</FormLabel>
                  <FormControl>
                    <Input placeholder="Fido" {...field} aria-invalid={!!form.formState.errors.dogName} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Breed</FormLabel>
                  <FormControl>
                    <Select onValueChange={(v) => field.onChange(v)} value={field.value as string | undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select breed" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Labrador Retriever">Labrador Retriever</SelectItem>
                        <SelectItem value="Golden Retriever">Golden Retriever</SelectItem>
                        <SelectItem value="German Shepherd">German Shepherd</SelectItem>
                        <SelectItem value="Beagle">Beagle</SelectItem>
                        <SelectItem value="Bulldog">Bulldog</SelectItem>
                        <SelectItem value="Mixed">Mixed</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sex</FormLabel>
                  <FormControl>
                    <Select onValueChange={(v) => field.onChange(v)} value={field.value as string | undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button type="button" variant="outline" className="justify-start font-normal">
                            {field.value ? field.value.toISOString().slice(0, 10) : "Select date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(d) => {
                            if (d) field.onChange(d);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weightLbs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (lbs)</FormLabel>
                    <FormControl>
                      <Input type="number" inputMode="numeric" placeholder="30" {...field} aria-invalid={!!form.formState.errors.weightLbs} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="spayedNeutered"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Spayed / Neutered</FormLabel>
                    <FormControl>
                      <Switch checked={field.value as boolean | undefined} onCheckedChange={(v) => field.onChange(Boolean(v))} aria-invalid={!!form.formState.errors.spayedNeutered} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="microchipped"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Microchipped</FormLabel>
                    <FormControl>
                      <Switch checked={field.value as boolean | undefined} onCheckedChange={(v) => field.onChange(Boolean(v))} aria-invalid={!!form.formState.errors.microchipped} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="chipId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Microchip ID (if microchipped)</FormLabel>
                    <FormControl>
                      <Input placeholder="1234-ABCD" {...field} aria-invalid={!!form.formState.errors.chipId} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rabiesVaccinationDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Rabies vaccination date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button type="button" variant="outline" className="justify-start font-normal">
                            {field.value ? field.value.toISOString().slice(0, 10) : "Select date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(d) => {
                            if (d) field.onChange(d);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rabiesCertificateUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rabies certificate URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/certificate.pdf" {...field} aria-invalid={!!form.formState.errors.rabiesCertificateUrl} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="licenseType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License type</FormLabel>
                  <FormControl>
                    <Select onValueChange={(v) => field.onChange(v)} value={field.value as string | undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="renewal">Renewal</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="licenseDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License duration</FormLabel>
                  <FormControl>
                    <Select onValueChange={(v) => field.onChange(v)} value={field.value as string | undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1_year">1 year</SelectItem>
                        <SelectItem value="3_years">3 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreeTerms"
              render={({ field }) => (
                <FormItem className="flex items-start gap-3">
                  <FormControl>
                    <Switch checked={field.value as boolean | undefined} onCheckedChange={(v) => field.onChange(Boolean(v))} aria-invalid={!!form.formState.errors.agreeTerms} />
                  </FormControl>
                  <div className="flex-1">
                    <FormLabel>Agree to terms and Franklin County licensing conditions</FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="text-sm text-muted-foreground">
              Fees are calculated at submission based on Franklin County rates.
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          {step > 0 && (
            <Button type="button" variant="outline" onClick={handleBack} disabled={isSubmitting}>
              Back
            </Button>
          )}

          {step < 2 && (
            <Button type="button" onClick={handleNext} disabled={isSubmitting}>
              Next
            </Button>
          )}

          {step === 2 && (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
              setStep(0);
            }}
            disabled={isSubmitting}
          >
            Reset
          </Button>
        </div>

        {form.formState.errors.root?.message ? (
          <div className="text-sm text-destructive">{form.formState.errors.root.message}</div>
        ) : null}
      </form>
    </Form>
  );
}
