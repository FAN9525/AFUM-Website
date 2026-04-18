create table public.products (
  id          uuid        primary key default gen_random_uuid(),
  slug        text        unique not null,
  title       text        not null,
  short_title text        not null,
  description text,
  features    text[]      default '{}',
  created_at  timestamptz default now()
);

comment on table public.products is
  'Structured product metadata for the four AFUM insurance lines.';

-- Seed the four products
insert into public.products (slug, title, short_title, description, features)
values
  (
    'domestic',
    'Domestic Insurance',
    'Personal Focus',
    'Comprehensive home and contents coverage, expertly underwritten for clients who value protection over price.',
    array['All-risk cover', 'Theft protection', 'Liability cover', 'Building insurance']
  ),
  (
    'commercial',
    'Commercial Insurance',
    'Commercial Focus',
    'Business packages designed for stability, protecting commercial assets with precision and expertise.',
    array['Property cover', 'Business interruption', 'Liability protection', 'Asset coverage']
  ),
  (
    'agri',
    'Agri Insurance',
    'Agri Focus',
    'Specialized farm coverage combining residential and commercial protection for agricultural operations.',
    array['Farm buildings', 'Equipment cover', 'Livestock options', 'Crop insurance']
  ),
  (
    'hospitality',
    'Hospitality Insurance',
    'Hospitality Focus',
    'Tailored solutions for guesthouses, hotels, and tourism businesses that demand excellence.',
    array['Guest liability', 'Property cover', 'Business interruption', 'Contents insurance']
  );
