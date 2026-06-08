export async function onRequestPost(context) {
  const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const data = await context.request.json();
    const { nombre, empresa, email, telefono, mensaje } = data;

    if (!nombre || !email || !mensaje) {
      return new Response(JSON.stringify({ ok: false, error: 'Campos obligatorios vacíos' }), { status: 400, headers: CORS });
    }

    const apiKey = context.env.WEB3FORMS_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ ok: false, error: 'Sin clave API configurada' }), { status: 500, headers: CORS });
    }

    const payload = {
      access_key: apiKey,
      subject: `Nueva consulta web · ${nombre}`,
      from_name: 'Limonada Web · Formulario',
      to_email: 'hola@limonadaweb.com',
      name: nombre,
      email: email,
      message: `Empresa: ${empresa || '—'}\nTeléfono: ${telefono || '—'}\n\n${mensaje}`,
      botcheck: '',
    };

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: CORS });
    } else {
      return new Response(JSON.stringify({ ok: false, error: result.message }), { status: 500, headers: CORS });
    }
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500, headers: CORS });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
