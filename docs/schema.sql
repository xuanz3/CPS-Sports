-- CPS SPORTS future Supabase PostgreSQL schema draft.
-- Not activated in storefront v0.1. Amounts stored in smallest currency unit.
create extension if not exists pgcrypto;
create table if not exists public.sport_categories (
 slug text primary key,
 name text not null,
 sort_order int not null default 0,
 active boolean not null default true
);
create table if not exists public.sport_products (
 id uuid primary key default gen_random_uuid(),
 slug text unique not null,
 category_slug text not null references public.sport_categories(slug),
 name text not null,
 description text not null default '',
 currency char(3) not null default 'CNY',
 is_published boolean not null default false,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create table if not exists public.product_variants (
 id uuid primary key default gen_random_uuid(),
 product_id uuid not null references public.sport_products(id) on delete cascade,
 sku text unique not null,
 label text not null default 'default',
 price_minor bigint not null check(price_minor>=0),
 available_stock integer not null default 0 check(available_stock>=0),
 active boolean not null default true
);
create table if not exists public.product_images (
 id uuid primary key default gen_random_uuid(),
 product_id uuid not null references public.sport_products(id) on delete cascade,
 image_url text not null,
 alt_text text not null,
 sort_order integer not null default 0
);
create table if not exists public.customer_profiles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 full_name text,
 created_at timestamptz not null default now()
);
create table if not exists public.customer_orders (
 id uuid primary key default gen_random_uuid(),
 user_id uuid references auth.users(id),
 status text not null default 'pending' check(status in ('pending','payment_processing','paid','fulfilled','cancelled','refunded')),
 currency char(3) not null default 'CNY',
 subtotal_minor bigint not null check(subtotal_minor>=0),
 shipping_minor bigint not null default 0 check(shipping_minor>=0),
 discount_minor bigint not null default 0 check(discount_minor>=0),
 total_minor bigint not null check(total_minor>=0),
 email text not null,
 delivery_address jsonb not null,
 payment_session_id text unique,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create table if not exists public.customer_order_items (
 id uuid primary key default gen_random_uuid(),
 order_id uuid not null references public.customer_orders(id) on delete cascade,
 variant_id uuid not null references public.product_variants(id),
 sku_snapshot text not null,
 name_snapshot text not null,
 unit_price_minor bigint not null check(unit_price_minor>=0),
 quantity integer not null check(quantity between 1 and 99)
);
create table if not exists public.payment_webhook_events (
 provider_event_id text primary key,
 processed_at timestamptz not null default now()
);
create index if not exists idx_product_category on public.sport_products(category_slug,is_published);
create index if not exists idx_variant_product on public.product_variants(product_id,active);
create index if not exists idx_order_user on public.customer_orders(user_id,created_at desc);
alter table public.sport_categories enable row level security;
alter table public.sport_products enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_images enable row level security;
alter table public.customer_profiles enable row level security;
alter table public.customer_orders enable row level security;
alter table public.customer_order_items enable row level security;
alter table public.payment_webhook_events enable row level security;
create policy "read_active_categories" on public.sport_categories for select using (active=true);
create policy "read_published_products" on public.sport_products for select using (is_published=true);
create policy "read_active_variants" on public.product_variants for select using (active=true and exists(select 1 from public.sport_products p where p.id=product_id and p.is_published=true));
create policy "read_published_images" on public.product_images for select using (exists(select 1 from public.sport_products p where p.id=product_id and p.is_published=true));
create policy "read_own_profile" on public.customer_profiles for select using (auth.uid()=user_id);
create policy "read_own_orders" on public.customer_orders for select using (auth.uid()=user_id);
create policy "read_own_order_items" on public.customer_order_items for select using (exists(select 1 from public.customer_orders o where o.id=order_id and o.user_id=auth.uid()));
-- Production writes require trusted server/service-role operations with explicit authentication,
-- validated transitions, transactional inventory, and verified payment webhooks.
