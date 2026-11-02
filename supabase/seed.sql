-- Ada Ateliê — rode depois do schema.sql.
-- Pode rodar de novo: troca o catálogo de demonstração pelo catálogo atual.

delete from products;
delete from categories;

insert into categories (slug, name, description, tone) values
  ('kits', 'Kits', 'Kits prontos para presentear, com as peças do mesmo tema.', '#1f1a17'),
  ('chaveiros', 'Chaveiros e bottons', 'Chaveiros, imãs e bottons para lembrança.', '#1787c9'),
  ('papelaria', 'Papelaria', 'Calendários, agendas, etiquetas e cartões feitos sob medida.', '#8c5a3c'),
  ('canecas', 'Canecas', 'Canecas temáticas com foto, imagem ou mensagem.', '#c4522a'),
  ('casa', 'Casa', 'Azulejos personalizados em vários tamanhos.', '#6b4c3b'),
  ('festas', 'Festas', 'Caixas e personalizados para datas e celebrações.', '#8d3d55')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  tone = excluded.tone;

insert into companies (slug, name, city, state, about, phone, email, specialty, since) values
  ('ada-atelie', 'Ad Ateliê Personalizados', 'Minas Gerais', 'MG', 'Transformo suas ideias em presentes e personalizados únicos. Feito sob medida, com acabamento artesanal.', '(31) 97335-3097', '', 'Presentes e personalizados', 0)
on conflict (slug) do update set
  name = excluded.name,
  city = excluded.city,
  state = excluded.state,
  about = excluded.about,
  phone = excluded.phone,
  email = excluded.email,
  specialty = excluded.specialty,
  since = excluded.since;

insert into products (
  slug, name, summary, description, category_slug, company_slug, material, colors,
  capacity, customization, min_quantity, price_from, price_hint, featured, image, palette
) values
  ('calendarios-ima', 'Calendários com imã', 'Envelopes e cartões. Valor unitário.', 'Calendários com imã, envelopes e cartões. Valor unitário.', 'papelaria', 'ada-atelie', '', '', 'Envelopes e cartões', '', 1, 9.90, '', true, '/produtos/calendarios-ima.jpg', '#1787c9,#f5f6f8,#333333'),
  ('kit-caderneta-vacinacao', 'Kit caderneta de vacinação', 'Caderneta, livro do bebê, toalhinha de boca, chaveiro e button.', 'Kit composto por caderneta, livro do bebê, toalhinha de boca, chaveiro e button.', 'kits', 'ada-atelie', '', '', 'Caderneta, livro do bebê, toalhinha de boca, chaveiro e button', '', 1, 175.90, '', true, '/produtos/kit-caderneta-vacinacao.jpg', '#1787c9,#f5f6f8,#333333'),
  ('kit-devocional', 'Kit devocional', 'Devocional, toalha personalizada, chaveiro, button e caneca.', 'Devocional, toalha personalizada com o tema, chaveiro, button e caneca.', 'kits', 'ada-atelie', '', '', 'Devocional, toalha, chaveiro, button e caneca', 'Toalha personalizada com o tema', 1, 165.60, '', false, '/produtos/kit-devocional.jpg', '#1787c9,#f5f6f8,#333333'),
  ('chaveiro-espelho', 'Chaveiro espelho', 'Chaveiro espelho.', 'Chaveiro espelho.', 'chaveiros', 'ada-atelie', '', '', '', '', 1, 12.90, '', true, '/produtos/chaveiro-espelho.jpg', '#1787c9,#f5f6f8,#333333'),
  ('kit-dia-do-professor', 'Kit dia do professor', 'Kit dia do professor.', 'Kit dia do professor.', 'kits', 'ada-atelie', '', '', '', '', 1, 89.90, '', false, '/produtos/kit-dia-do-professor.jpg', '#1787c9,#f5f6f8,#333333'),
  ('chaveiro-amigas-de-oracao', 'Chaveiro Amigas de Oração', 'Valor por unidade.', 'Chaveiro Amigas de Oração. Valor por unidade.', 'chaveiros', 'ada-atelie', '', '', '', '', 1, 17.90, 'a unidade', false, '/produtos/chaveiro-amigas-de-oracao.jpg', '#1787c9,#f5f6f8,#333333'),
  ('chaveiro-imas-bottons', 'Chaveiro, imãs e bottons', 'Inclui botton abridor de garrafa. A partir de R$ 6,80.', 'Chaveiro, imãs, bottons e botton abridor de garrafa. A partir de R$ 6,80.', 'chaveiros', 'ada-atelie', '', '', 'Chaveiro, imãs, bottons e botton abridor de garrafa', '', 1, 6.80, 'A partir de', false, '/produtos/chaveiro-imas-bottons.jpg', '#1787c9,#f5f6f8,#333333'),
  ('agendas-planners', 'Agendas, devocionais, planners e bloquinhos', 'Os valores variam.', 'Agendas, devocionais, planners e bloquinhos. Os valores variam.', 'papelaria', 'ada-atelie', '', '', 'Agendas, devocionais, planners e bloquinhos', '', 1, 49.90, '', false, '/produtos/agendas-planners.jpg', '#1787c9,#f5f6f8,#333333'),
  ('kit-15-anos', 'Kit 15 anos', 'Kit com 10 modelos.', 'Kit 15 anos, com 10 modelos.', 'kits', 'ada-atelie', '', '', '10 modelos', '', 1, 89.90, '', true, '/produtos/kit-15-anos.jpg', '#1787c9,#f5f6f8,#333333'),
  ('etiquetas-escolares', 'Etiquetas escolares', 'Etiquetas escolares.', 'Etiquetas escolares.', 'papelaria', 'ada-atelie', '', '', '', '', 1, 15.90, '', true, '/produtos/etiquetas-escolares.jpg', '#1787c9,#f5f6f8,#333333'),
  ('personalizados-classicos', 'Personalizados clássicos', '3 caixas pirâmide, 3 caixas bala, 2 caixas milk e 2 caixas sushi.', 'A partir de R$ 79,90. O kit compõe 3 caixas pirâmide, 3 caixas bala, 2 caixas milk e 2 caixas sushi.', 'kits', 'ada-atelie', '', '', '3 caixas pirâmide, 3 caixas bala, 2 caixas milk e 2 caixas sushi', '', 1, 79.90, 'A partir de', false, '/produtos/personalizados-classicos.jpg', '#1787c9,#f5f6f8,#333333'),
  ('sacolas', 'Sacolas personalizadas', 'A partir de R$ 19,90.', 'Sacolas personalizadas. A partir de R$ 19,90.', 'festas', 'ada-atelie', '', '', '', '', 1, 19.90, 'A partir de', false, '/produtos/sacolas.jpg', '#1787c9,#f5f6f8,#333333'),
  ('calendarios', 'Calendários', 'Diversos tamanhos e temas. A partir de R$ 15,90.', 'Calendários em diversos tamanhos e temas. A partir de R$ 15,90.', 'papelaria', 'ada-atelie', '', '', 'Diversos tamanhos e temas', '', 1, 15.90, 'A partir de', false, '/produtos/calendarios.jpg', '#1787c9,#f5f6f8,#333333'),
  ('cartao-gigante', 'Cartão gigante', 'Tema à escolha do cliente.', 'Cartão gigante. Tema à escolha do cliente.', 'papelaria', 'ada-atelie', '', '', '', 'Tema à escolha do cliente', 1, 23.70, '', false, '/produtos/cartao-gigante.jpg', '#1787c9,#f5f6f8,#333333'),
  ('caixas-natal', 'Caixas personalizadas para Natal', 'Pode acompanhar guloseimas por R$ 35,90.', 'Caixas personalizadas para Natal. Pode acompanhar guloseimas por R$ 35,90.', 'festas', 'ada-atelie', '', '', '', 'Guloseimas por R$ 35,90', 1, 27.80, '', false, '/produtos/caixas-natal.jpg', '#1787c9,#f5f6f8,#333333'),
  ('azulejos', 'Azulejos', '15×15 R$ 39,90, 20×20 R$ 49,90 e 50×50 R$ 69,90.', 'Azulejos personalizados. 15×15 por R$ 39,90, 20×20 por R$ 49,90 e 50×50 por R$ 69,90.', 'casa', 'ada-atelie', '', '', '15×15, 20×20 e 50×50', '15×15 R$ 39,90 · 20×20 R$ 49,90 · 50×50 R$ 69,90', 1, 39.90, 'A partir de', false, '/produtos/azulejos.jpg', '#1787c9,#f5f6f8,#333333'),
  ('personalizados-luxo', 'Personalizados de luxo', '3 caixas pirâmide, 3 caixas bala, 2 caixas milk e 2 caixas sushi.', 'A partir de R$ 89,90. O kit compõe 3 caixas pirâmide, 3 caixas bala, 2 caixas milk e 2 caixas sushi.', 'kits', 'ada-atelie', '', '', '3 caixas pirâmide, 3 caixas bala, 2 caixas milk e 2 caixas sushi', '', 1, 89.90, 'A partir de', false, '/produtos/personalizados-luxo.jpg', '#1787c9,#f5f6f8,#333333'),
  ('cadernetas-vacinacao', 'Cadernetas de vacinação', 'Caderneta A5, livro do bebê A5, porta documentos A6, card e cartão SUS.', 'A partir de R$ 89,90, com vários temas à escolha. O kit compõe caderneta A5, livro do bebê A5, porta documentos A6, card e cartão SUS.', 'kits', 'ada-atelie', '', '', 'Caderneta A5, livro do bebê A5, porta documentos A6, card e cartão SUS', 'Vários temas à escolha', 1, 89.90, 'A partir de', false, '/produtos/cadernetas-vacinacao.jpg', '#1787c9,#f5f6f8,#333333'),
  ('canecas-tematicas', 'Canecas temáticas personalizadas', 'Fotos, imagens temáticas e mensagens. A partir de R$ 49,90.', 'Canecas temáticas personalizadas, a partir de R$ 49,90. Colocamos fotos, imagens temáticas e mensagens.', 'canecas', 'ada-atelie', '', '', '', 'Fotos, imagens temáticas e mensagens', 1, 49.90, 'A partir de', true, '/produtos/canecas-tematicas.jpg', '#1787c9,#f5f6f8,#333333'),
  ('kit-devocional-mensagens', 'Kit devocional com mensagens', 'Cartão magnético, caderneta, caixinha com versículos e pote com mensagens bíblicas.', 'O kit compõe 1 cartão magnético, 1 caderneta, 1 caixinha com versículos e 1 pote com mensagens bíblicas.', 'kits', 'ada-atelie', '', '', 'Cartão magnético, caderneta, caixinha com versículos e pote com mensagens bíblicas', '', 1, 169.90, '', false, '/produtos/kit-devocional-mensagens.jpg', '#1787c9,#f5f6f8,#333333')
on conflict (slug) do update set
  name = excluded.name,
  summary = excluded.summary,
  description = excluded.description,
  category_slug = excluded.category_slug,
  company_slug = excluded.company_slug,
  material = excluded.material,
  colors = excluded.colors,
  capacity = excluded.capacity,
  customization = excluded.customization,
  min_quantity = excluded.min_quantity,
  price_from = excluded.price_from,
  price_hint = excluded.price_hint,
  featured = excluded.featured,
  image = excluded.image,
  palette = excluded.palette;
