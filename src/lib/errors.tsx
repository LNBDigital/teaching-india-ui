// lib/errors.tsx
'use client';

type FieldErrorProps = {
  name: string;
  errors?: Record<string, string[]>;
};
export const DisplayFormErrors = ({ name, errors }: FieldErrorProps) => {
  if (!errors || !errors[name]) return undefined;
  return (
    <>
      {errors[name].map((msg, i) => (
        <p key={i} className="text-red-400 text-sm mt-1">{msg}</p>
      ))}
    </>
  );
};
