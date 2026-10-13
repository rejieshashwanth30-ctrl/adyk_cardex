import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  const logoBase64 = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsSAAALEgHS3X78AAACJ0lEQVRYhdWXS6txURjH19qSI8q1DAhDlIFbMiQDzIxcMlCEkSKXgQwMmCkiBpIxH0Ax9hF8n/9prfZ74j1xHGzed/DPbu3n8fyey1osQgjBm0XOFgRBkFQXASilUCgU+Pj4kFQsBov1DUChUEAul0techaDxToDoJRyulf1XalUnlaB8N68GuBkHsj/AUDPB+ch27sBZDLZxe30Z53ZSAJArmT5d0BJAFarFcbjMSqVCjKZzLf3bK1arWI6nWK5XD4PQBANS6USJpMJYrEYRqMRXC7Xl00oFMJisUAikcBwOESxWDzzfQiAiuXU6XSo1+v8uVarYbPZfNnMZjMMBgP+3Gg0oNVqr7bi1y2QyWT8k5Xf7/cjEAjwamg0Guj1ejSbTTidTmSzWeTz+TOfpwBQMROr1Yr5fA6Hw4FoNMrbEYlEEI/H+fvj8YhgMHi1/HcPIRUh9vs9CoUC7HY72u02ut0uwuEwyuUyer2edLtAEB18Ph86nQ5sNhvW6zW22y3/QjZ4rD0/ZX83ADlRq9WCwWBAMpnkslgsfO3W0/JuAEF0Yn1nW9Hj8fBW7HY7pFKpH4fvYQAqZmg0GnE4HPggut1ufgaYzeab+v9wCwTRMZ1O84n3er3I5XI3Z/8wABUzZPu/3+/zA8hkMt2c/VOGkIhSqVRQq9W/9nvaryE90csByAnEWypAHtC/B0Df/becvPtiQk6uZoxOSl28mhFRb7ucvkuf7ZRoT/rb5zoAAAAASUVORK5CYII=';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000000',
          borderRadius: '6px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${logoBase64}`}
          alt="ADYK CARDEX"
          width="32"
          height="32"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size }
  );
}
