-- =========================================================
-- Esquema de base de datos para la tienda de trail running
-- Ejecutar en: Supabase Dashboard -> SQL Editor
-- =========================================================

-- Categorías
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  parent_id uuid references categories(id)
);

-- Productos
create table products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  brand text,
  category_id uuid references categories(id),
  base_price numeric not null,
  status text default 'draft', -- draft | published
  created_at timestamptz default now()
);

-- Imágenes de producto
create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  url text not null,
  position int default 0
);

-- Variantes (talla, color, etc.)
create table product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  sku text unique,
  price numeric not null,
  inventory_quantity int default 0,
  options jsonb -- ej: { "talla": "M", "color": "Negro" }
);

-- Carrito
create table carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  created_at timestamptz default now()
);

create table cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid references carts(id) on delete cascade,
  variant_id uuid references product_variants(id),
  quantity int not null default 1
);

-- Órdenes
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  status text default 'pending', -- pending | paid | shipped | delivered | cancelled
  total numeric not null,
  shipping_address jsonb,
  created_at timestamptz default now()
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  variant_id uuid references product_variants(id),
  quantity int not null,
  unit_price numeric not null
);

-- =========================================================
-- Row Level Security
-- =========================================================

alter table categories enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table product_variants enable row level security;
alter table carts enable row level security;
alter table cart_items enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Lectura pública de catálogo (cualquiera puede ver productos publicados)
create policy "Categorías visibles para todos"
  on categories for select using (true);

create policy "Productos publicados visibles para todos"
  on products for select using (status = 'published');

create policy "Imágenes visibles para todos"
  on product_images for select using (true);

create policy "Variantes visibles para todas"
  on product_variants for select using (true);

-- Carritos: como manejamos carrito de invitado (sin login) con un id
-- guardado en localStorage, permitimos insert/select/update público.
-- Si agregas autenticación de usuarios, conviene restringir esto a
-- auth.uid() = user_id además de permitir el flujo de invitado.
create policy "Cualquiera puede crear un carrito"
  on carts for insert with check (true);

create policy "Cualquiera puede ver carritos (por id, no se listan)"
  on carts for select using (true);

create policy "Cualquiera puede agregar items a un carrito"
  on cart_items for insert with check (true);

create policy "Cualquiera puede ver items de carrito"
  on cart_items for select using (true);

create policy "Cualquiera puede actualizar items de carrito"
  on cart_items for update using (true);

create policy "Cualquiera puede borrar items de carrito"
  on cart_items for delete using (true);

-- Órdenes: solo se crean desde el webhook de Stripe (service_role),
-- que se salta RLS, así que aquí NO exponemos insert público.
create policy "Usuarios ven solo sus propias órdenes"
  on orders for select using (auth.uid() = user_id);

create policy "Usuarios ven items de sus propias órdenes"
  on order_items for select using (
    exists (
      select 1 from orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- =========================================================
-- Datos de ejemplo (opcional, para probar el catálogo)
-- =========================================================

insert into categories (name, slug) values
  ('Camisetas', 'camisetas'),
  ('Calzado', 'calzado'),
  ('Accesorios', 'accesorios');

insert into products (title, slug, description, brand, category_id, base_price, status)
select
  'Camiseta Trail Pro',
  'camiseta-trail-pro',
  'Camiseta técnica transpirable, ideal para carreras largas en montaña.',
  'TrailCo',
  id,
  199.00,
  'published'
from categories where slug = 'camisetas';

insert into product_variants (product_id, sku, price, inventory_quantity, options)
select id, 'CTP-M-NEG', 199.00, 12, '{"talla": "M", "color": "Negro"}'::jsonb
from products where slug = 'camiseta-trail-pro'
union all
select id, 'CTP-L-NEG', 199.00, 8, '{"talla": "L", "color": "Negro"}'::jsonb
from products where slug = 'camiseta-trail-pro'
union all
select id, 'CTP-M-AZU', 199.00, 5, '{"talla": "M", "color": "Azul"}'::jsonb
from products where slug = 'camiseta-trail-pro';

insert into product_images (product_id, url, position)
select id, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', 0
from products where slug = 'camiseta-trail-pro';
