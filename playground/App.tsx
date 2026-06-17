import { useState } from 'react';
import {
  TYPOGRAPHY_VARIANTS,
  typographyClass,
  Text,
  Heading,
  Button,
  IconButton,
  Input,
  SearchInput,
  Textarea,
  Field,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Badge,
  Tag,
  Chip,
  Alert,
  InlineInform,
  Divider,
  Skeleton,
  Tooltip,
  Popover,
  Modal,
  Select,
  Menu,
  Tabs,
  Breadcrumbs,
  Pagination,
  Avatar,
  Table,
  DatePicker,
  type Brand,
  type Tone,
  type ButtonVariant,
  type ButtonSize,
} from 'liga-ds';
import {
  IconSearch,
  IconAdd,
  IconEdit,
  IconTrash,
  IconDownload,
  IconUpload,
  IconSettings,
  IconCalendar,
  IconBookmark,
  IconCheck,
  IconFolder,
  IconLock,
  IconEye,
  IconShare,
  IconCopy,
  IconFilters,
  IconInfo,
  IconSend,
  IconTag,
  IconChevronRight,
  IconChevronDown,
  IconStarFavoriteFilled,
  IconClose,
  IconUserEdit,
} from '@liga360/icons';

const SAMPLE_ICONS = [
  ['IconSearch', IconSearch], ['IconAdd', IconAdd], ['IconEdit', IconEdit], ['IconTrash', IconTrash],
  ['IconDownload', IconDownload], ['IconUpload', IconUpload], ['IconSettings', IconSettings], ['IconCalendar', IconCalendar],
  ['IconBookmark', IconBookmark], ['IconCheck', IconCheck], ['IconFolder', IconFolder], ['IconLock', IconLock],
  ['IconEye', IconEye], ['IconShare', IconShare], ['IconCopy', IconCopy], ['IconFilters', IconFilters],
  ['IconInfo', IconInfo], ['IconSend', IconSend], ['IconTag', IconTag], ['IconChevronRight', IconChevronRight],
  ['IconChevronDown', IconChevronDown], ['IconStarFavoriteFilled', IconStarFavoriteFilled], ['IconClose', IconClose], ['IconUserEdit', IconUserEdit],
] as const;

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const BTN_VARIANTS: ButtonVariant[] = [
  'primary',
  'secondary',
  'transparent',
  'danger',
  'danger-secondary',
  'danger-transparent',
];
const BTN_SIZES: ButtonSize[] = ['sm', 'md', 'lg', 'xl'];
const TONES: Tone[] = ['primary', 'success', 'danger', 'warning', 'info', 'neutral'];

const PRIMARY = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const NEUTRAL = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const STATUS = [
  ['text-success', 'success'],
  ['text-danger', 'danger'],
  ['text-warning', 'warning'],
  ['text-information', 'info'],
  ['text-accent', 'accent'],
] as const;

/* ---- full color-token inventory (matches Figma Primitives + Charts) ---- */
const OTHER_FAMILIES: [string, string][] = [
  ['Red', 'red'],
  ['Orange red', 'orange-red'],
  ['Orange', 'orange'],
  ['Warm yellow', 'warm-yellow'],
  ['Warm green', 'warm-green'],
  ['Cool green', 'cool-green'],
  ['Blue', 'blue'],
];
const OTHER_STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const NEUTRAL_SOLID = [100, 125, 150, 200, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000];
const NEUTRAL_ALPHA = [0, 100, 200, 300, 400, 500, 600, 700, 800, 850, 900];
const DARK_SOLID = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const DARK_ALPHA = [100, 200, 300, 400, 500, 600, 700, 800, 850, 900];
const CHART_COLORS = Array.from({ length: 21 }, (_, i) => i + 1);
const MONOCHROME = [21, 22, 23, 24, 25, 26, 27, 28];
const UNIQUE = ['blue', 'green', 'yellow', 'marine', 'purple', 'cyan', 'brown', 'lime', 'grey', 'red'];
const NODES = [
  'property', 'business-group', 'central-node', 'sanction', 'phone', 'court',
  'group-list-element', 'email', 'unknown', 'person', 'location', 'company',
];

const ramp = (prefix: string, steps: (number | string)[]) =>
  steps.map((s) => ({ name: `${prefix}-${s}`, label: String(s) }));

function Swatch({ varName, label }: { varName: string; label: string }) {
  return (
    <div style={{ textAlign: 'center', fontSize: 10 }}>
      <div
        style={{
          width: 56,
          height: 40,
          borderRadius: 'var(--cntnr-corner-small)',
          background: `var(--${varName})`,
          border: '1px solid var(--cntnr-border-default)',
        }}
      />
      <div style={{ marginTop: 4, color: 'var(--text-subtlest)' }}>{label}</div>
    </div>
  );
}

function Ramp({ title, vars }: { title: string; vars: { name: string; label: string }[] }) {
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          color: 'var(--text-subtlest)',
          marginBottom: 6,
          fontFamily: 'var(--liga-font-family)',
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {vars.map(({ name, label }) => (
          <div key={name} style={{ textAlign: 'center', fontSize: 9 }} title={`--${name}`}>
            <div
              style={{
                width: 44,
                height: 32,
                borderRadius: 'var(--cntnr-corner-small)',
                background: `var(--${name})`,
                border: '1px solid var(--cntnr-border-subtlest)',
              }}
            />
            <div style={{ marginTop: 2, color: 'var(--text-subtlest)' }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function App() {
  const [brand, setBrand] = useState<Brand>('liga360');
  const [page, setPage] = useState(3);
  const [wifi, setWifi] = useState(true);

  return (
    <div
      className="liga-root"
      data-brand={brand}
      style={{ minHeight: '100vh', padding: 'var(--space-600)' }}
    >
      <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-300)', marginBottom: 'var(--space-600)' }}>
        <h1 className={typographyClass('h700-semibold')} style={{ color: 'var(--text-default)' }}>
          Liga DS — Tokens
        </h1>
        <div style={{ display: 'flex', gap: 'var(--space-100)' }}>
          {(['liga360', 'united'] as Brand[]).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBrand(b)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--cntnr-corner-infinity)',
                border: '1px solid var(--cntnr-border-default)',
                cursor: 'pointer',
                background: brand === b ? 'var(--btn-bg-primary-active)' : 'var(--cntnr-bg-primary-default)',
                color: brand === b ? 'var(--text-alternative)' : 'var(--text-default)',
                fontFamily: 'var(--liga-font-family)',
              }}
            >
              {b}
            </button>
          ))}
        </div>
      </header>

      <section style={{ marginBottom: 'var(--space-600)' }}>
        <h2 className={typographyClass('h400-medium')} style={{ color: 'var(--text-default)', marginBottom: 'var(--space-200)' }}>
          Brand / Primary
        </h2>
        <div style={{ display: 'flex', gap: 'var(--space-100)', flexWrap: 'wrap' }}>
          {PRIMARY.map((n) => (
            <Swatch key={n} varName={`color-primary-${n}`} label={String(n)} />
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 'var(--space-600)' }}>
        <h2 className={typographyClass('h400-medium')} style={{ color: 'var(--text-default)', marginBottom: 'var(--space-200)' }}>
          Neutral
        </h2>
        <div style={{ display: 'flex', gap: 'var(--space-100)', flexWrap: 'wrap' }}>
          {NEUTRAL.map((n) => (
            <Swatch key={n} varName={`color-neutral-solid-${n}`} label={String(n)} />
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 'var(--space-600)' }}>
        <h2 className={typographyClass('h400-medium')} style={{ color: 'var(--text-default)', marginBottom: 'var(--space-200)' }}>
          Status text
        </h2>
        <div style={{ display: 'flex', gap: 'var(--space-400)', flexWrap: 'wrap' }}>
          {STATUS.map(([v, label]) => (
            <span key={v} className={typographyClass('h300-medium')} style={{ color: `var(--${v})` }}>
              {label}
            </span>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 'var(--space-600)' }}>
        <h2 className={typographyClass('h400-medium')} style={{ color: 'var(--text-default)', marginBottom: 'var(--space-300)' }}>
          All color tokens
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-400)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-200)' }}>
            <Ramp title="Primary" vars={ramp('color-primary', PRIMARY)} />
            <Ramp title="Neutral / Solid" vars={ramp('color-neutral-solid', NEUTRAL_SOLID)} />
            <Ramp title="Neutral / Alpha" vars={ramp('color-neutral-alpha', NEUTRAL_ALPHA)} />
            <Ramp title="Dark Neutral / Solid" vars={ramp('color-dark-neutral-solid', DARK_SOLID)} />
            <Ramp title="Dark Neutral / Alpha" vars={ramp('color-dark-neutral-alpha', DARK_ALPHA)} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-200)' }}>
            {OTHER_FAMILIES.map(([title, slug]) => (
              <Ramp
                key={slug}
                title={`Other colors / ${title}`}
                vars={ramp(`color-other-colors-${slug}`, OTHER_STEPS)}
              />
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-200)' }}>
            <Ramp title="Charts / Colors 1–21" vars={ramp('colors-color', CHART_COLORS)} />
            <Ramp title="Charts / Monochrome 21–28" vars={ramp('monochrome-color', MONOCHROME)} />
            <Ramp
              title="Charts / unique_colors"
              vars={UNIQUE.map((u) => ({ name: `unique-colors-${u}`, label: u }))}
            />
            <Ramp
              title="Charts / node (graph entities)"
              vars={NODES.map((n) => ({ name: `node-${n}`, label: n.replace(/-/g, ' ') }))}
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className={typographyClass('h400-medium')} style={{ color: 'var(--text-default)', marginBottom: 'var(--space-200)' }}>
          Type scale ({TYPOGRAPHY_VARIANTS.length} styles)
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-100)' }}>
          {TYPOGRAPHY_VARIANTS.map((v) => (
            <div key={v} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-300)' }}>
              <code style={{ width: 200, color: 'var(--text-subtlest)', fontSize: 11 }}>{v}</code>
              <span className={typographyClass(v)} style={{ color: 'var(--text-default)' }}>
                Закон і право — Liga
              </span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 'var(--space-800)' }}>
        <Heading level={3} style={{ marginBottom: 'var(--space-200)' }}>
          Components · Text / Heading
        </Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-150)' }}>
          <Heading level={1}>Heading level 1</Heading>
          <Heading level={2}>Heading level 2</Heading>
          <Heading level={4}>Heading level 4</Heading>
          <Text>Default body text (Text, h300-regular).</Text>
          <Text variant="h300-regular-paragraph" color="subtle">
            Subtle paragraph — for longer reading passages with comfortable line height.
          </Text>
          <div style={{ display: 'flex', gap: 'var(--space-300)', flexWrap: 'wrap' }}>
            <Text color="success">success</Text>
            <Text color="danger">danger</Text>
            <Text color="warning">warning</Text>
            <Text color="information">information</Text>
            <Text color="accent">accent</Text>
            <Text color="disabled">disabled</Text>
          </div>
          <Text variant="h200-caps" color="subtlest">Caps label</Text>
          <div style={{ width: 220, border: '1px dashed var(--cntnr-border-default)', padding: 'var(--space-100)' }}>
            <Text truncate>This is a very long single line that should truncate with an ellipsis</Text>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 'var(--space-800)' }}>
        <Heading level={3} style={{ marginBottom: 'var(--space-300)' }}>
          Components · Button
        </Heading>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-300)' }}>
          {BTN_VARIANTS.map((v) => (
            <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-200)', flexWrap: 'wrap' }}>
              <code style={{ width: 170, color: 'var(--text-subtlest)', fontSize: 11 }}>{v}</code>
              {BTN_SIZES.map((s) => (
                <Button key={s} variant={v} size={s}>
                  Button
                </Button>
              ))}
              <Button variant={v} leftIcon={<PlusIcon />}>
                Icon
              </Button>
              <Button variant={v} disabled>
                Disabled
              </Button>
              <Button variant={v} loading>
                Loading
              </Button>
            </div>
          ))}

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-200)', marginTop: 'var(--space-200)' }}>
            <code style={{ width: 170, color: 'var(--text-subtlest)', fontSize: 11 }}>IconButton</code>
            {BTN_SIZES.map((s) => (
              <IconButton key={s} size={s} icon={<PlusIcon />} aria-label="Add" />
            ))}
            <IconButton variant="primary" icon={<PlusIcon />} aria-label="Add" />
            <IconButton variant="danger" icon={<PlusIcon />} aria-label="Delete" />
            <IconButton variant="secondary" selected icon={<PlusIcon />} aria-label="Selected" />
          </div>
        </div>
      </section>

      <section style={{ marginTop: 'var(--space-800)', maxWidth: 360 }}>
        <Heading level={3} style={{ marginBottom: 'var(--space-300)' }}>
          Components · Inputs &amp; Field
        </Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-300)' }}>
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large (default)" leftIcon={<PlusIcon />} />
          <Input size="xl" placeholder="Large+" />
          <Input placeholder="Invalid" invalid defaultValue="bad value" />
          <Input placeholder="Disabled" disabled />
          <Input placeholder="Loading" loading />
          <SearchInput placeholder="Search documents" />
          <Textarea placeholder="Multi-line textarea…" />

          <Field
            label="Email"
            description="We never share it."
            required
          >
            <Input placeholder="you@liga.ua" />
          </Field>

          <Field label="Password" error="Password is required">
            <Input type="password" defaultValue="x" />
          </Field>
        </div>
      </section>

      <section style={{ marginTop: 'var(--space-800)' }}>
        <Heading level={3} style={{ marginBottom: 'var(--space-300)' }}>
          Components · Checkbox &amp; Radio &amp; Switch
        </Heading>
        <div style={{ display: 'flex', gap: 'var(--space-600)', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-150)' }}>
            <Checkbox defaultChecked>Checked</Checkbox>
            <Checkbox>Unchecked</Checkbox>
            <Checkbox indeterminate>Indeterminate</Checkbox>
            <Checkbox defaultChecked disabled>Disabled checked</Checkbox>
            <Checkbox disabled>Disabled</Checkbox>
          </div>
          <RadioGroup defaultValue="email" aria-label="Notify by">
            <Radio value="email">Email</Radio>
            <Radio value="sms">SMS</Radio>
            <Radio value="push">Push</Radio>
            <Radio value="none" disabled>None (disabled)</Radio>
          </RadioGroup>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-150)' }}>
            <Switch checked={wifi} onChange={(e) => setWifi(e.target.checked)}>Wi‑Fi (md, controlled)</Switch>
            <Switch defaultChecked size="sm">Bluetooth (sm)</Switch>
            <Switch>Airplane mode</Switch>
            <Switch invalid>Invalid</Switch>
            <Switch defaultChecked disabled>Disabled on</Switch>
            <Switch disabled>Disabled off</Switch>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 'var(--space-800)' }}>
        <Heading level={3} style={{ marginBottom: 'var(--space-300)' }}>
          Components · Badge · Tag · Chip
        </Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-300)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-150)', flexWrap: 'wrap', alignItems: 'center' }}>
            <code style={{ width: 60, color: 'var(--text-subtlest)', fontSize: 11 }}>solid</code>
            {TONES.map((t) => (
              <Badge key={t} tone={t} variant="solid">{t}</Badge>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-150)', flexWrap: 'wrap', alignItems: 'center' }}>
            <code style={{ width: 60, color: 'var(--text-subtlest)', fontSize: 11 }}>subtle</code>
            {TONES.map((t) => (
              <Badge key={t} tone={t} variant="subtle">{t}</Badge>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-150)', flexWrap: 'wrap', alignItems: 'center' }}>
            <code style={{ width: 60, color: 'var(--text-subtlest)', fontSize: 11 }}>Tag</code>
            <Tag tone="primary" onRemove={() => {}}>Frontend</Tag>
            <Tag tone="success" leftIcon={<PlusIcon />}>Verified</Tag>
            <Tag tone="danger" variant="solid" onRemove={() => {}}>Blocker</Tag>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-150)', flexWrap: 'wrap', alignItems: 'center' }}>
            <code style={{ width: 60, color: 'var(--text-subtlest)', fontSize: 11 }}>Chip</code>
            <Chip tone="primary" selected>Selected</Chip>
            <Chip tone="primary">Unselected</Chip>
            <Chip tone="neutral">Filter</Chip>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 'var(--space-800)', maxWidth: 520 }}>
        <Heading level={3} style={{ marginBottom: 'var(--space-300)' }}>
          Components · Alert · Divider · Skeleton
        </Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-200)' }}>
          <Alert tone="info" title="Heads up">This is an informational message.</Alert>
          <Alert tone="success" title="Saved" onClose={() => {}}>Your changes were saved.</Alert>
          <Alert tone="warning">Your trial ends in 3 days.</Alert>
          <Alert tone="danger" title="Error" onClose={() => {}}>Could not connect to the server.</Alert>

          <Text variant="h200-caps" color="subtlest">Divider — horizontal</Text>
          <Divider />
          <Text color="subtle">Text above and below a horizontal divider.</Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-200)', height: 24 }}>
            <Text>Left</Text>
            <Divider orientation="vertical" />
            <Text>Middle</Text>
            <Divider orientation="vertical" />
            <Text>Right</Text>
          </div>

          <Divider />
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-200)' }}>
            <Skeleton circle height={40} />
            <div style={{ flex: 1 }}>
              <Skeleton lines={2} />
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 'var(--space-800)', maxWidth: 600 }}>
        <Heading level={3} style={{ marginBottom: 'var(--space-300)' }}>
          Components · InlineInform
        </Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-200)' }}>
          <Text variant="h200-caps" color="subtlest">Full · Grey · Title + Description + Close</Text>
          <InlineInform title="Short description title" onClose={() => {}}>
            Lorem ipsum dolor sit amet consectetur. Sapien montes etiam nunc in mauris.
          </InlineInform>

          <Text variant="h200-caps" color="subtlest">Full · White · No Title · Actions</Text>
          <InlineInform
            background="white"
            actions={[
              { label: 'Button', onClick: () => {} },
              { label: 'Button', onClick: () => {}, variant: 'ghost' },
            ]}
          >
            Lorem ipsum dolor sit amet consectetur.
          </InlineInform>

          <Text variant="h200-caps" color="subtlest">Full · Warning · Title + Actions + Close</Text>
          <InlineInform
            background="warning"
            title="Short description title"
            onClose={() => {}}
            actions={[
              { label: 'Button', onClick: () => {} },
              { label: 'Button', onClick: () => {}, variant: 'ghost' },
            ]}
          >
            Lorem ipsum dolor sit amet consectetur. Sapien montes etiam nunc.
          </InlineInform>

          <Text variant="h200-caps" color="subtlest">Full · Green · No Close</Text>
          <InlineInform background="green" title="Short description title">
            Lorem ipsum dolor sit amet consectetur.
          </InlineInform>

          <Text variant="h200-caps" color="subtlest">Line · Grey · No Actions · Close</Text>
          <InlineInform type="line" onClose={() => {}}>
            Lorem ipsum dolor sit amet consectetur.
          </InlineInform>

          <Text variant="h200-caps" color="subtlest">Line · Warning · Actions + Close</Text>
          <InlineInform
            type="line"
            background="warning"
            onClose={() => {}}
            actions={[
              { label: 'Button', onClick: () => {} },
              { label: 'Button', onClick: () => {}, variant: 'ghost' },
            ]}
          >
            Lorem ipsum dolor sit amet consectetur.
          </InlineInform>

          <Text variant="h200-caps" color="subtlest">Line · Green · Actions</Text>
          <InlineInform
            type="line"
            background="green"
            actions={[
              { label: 'Button', onClick: () => {} },
              { label: 'Button', onClick: () => {}, variant: 'ghost' },
            ]}
          >
            Lorem ipsum dolor sit amet consectetur.
          </InlineInform>
        </div>
      </section>

      <section style={{ marginTop: 'var(--space-800)' }}>
        <Heading level={3} style={{ marginBottom: 'var(--space-300)' }}>
          Components · Tooltip · Popover · Modal
        </Heading>
        <Text color="subtle" style={{ marginBottom: 'var(--space-200)', display: 'block' }}>
          Tooltip is shown on hover or keyboard focus (it is not rendered statically).
        </Text>
        <div style={{ display: 'flex', gap: 'var(--space-300)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Tooltip content="I'm a tooltip">
            <Button variant="secondary">Hover / focus me</Button>
          </Tooltip>
          <Tooltip content="Settings">
            <IconButton icon={<IconSettings />} aria-label="Settings" variant="secondary" />
          </Tooltip>

          <Popover>
            <Popover.Trigger>
              <Button variant="secondary">Open popover</Button>
            </Popover.Trigger>
            <Popover.Content>
              <Heading level={5} style={{ marginBottom: 'var(--space-100)' }}>Popover title</Heading>
              <Text color="subtle">Anchored, dismissible content with managed focus.</Text>
            </Popover.Content>
          </Popover>

          <Modal>
            <Modal.Trigger>
              <Button variant="danger">Delete…</Button>
            </Modal.Trigger>
            <Modal.Content aria-label="Confirm delete">
              <Modal.Close />
              <Modal.Title>Delete document?</Modal.Title>
              <Modal.Description>This action cannot be undone.</Modal.Description>
              <div style={{ display: 'flex', gap: 'var(--space-100)', justifyContent: 'flex-end' }}>
                <Button variant="transparent">Cancel</Button>
                <Button variant="danger">Delete</Button>
              </div>
            </Modal.Content>
          </Modal>

          <div style={{ width: 220 }}>
            <Select
              aria-label="Framework"
              placeholder="Select framework"
              options={[
                { value: 'react', label: 'React' },
                { value: 'vue', label: 'Vue' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'solid', label: 'Solid' },
                { value: 'angular', label: 'Angular', disabled: true },
              ]}
              defaultValue="react"
            />
          </div>
        </div>
      </section>

      <section style={{ marginTop: 'var(--space-800)' }}>
        <Heading level={3} style={{ marginBottom: 'var(--space-300)' }}>
          Components · Tabs · Avatar
        </Heading>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-500)' }}>
          <div>
            <Text variant="h200-caps" color="subtlest">variant="pill" (default)</Text>
            <Tabs defaultValue="overview" variant="pill">
              <Tabs.List aria-label="Document sections (pill)">
                <Tabs.Tab value="overview" icon={<IconInfo />} count={2}>Overview</Tabs.Tab>
                <Tabs.Tab value="activity" icon={<IconBookmark />} count={12}>Activity</Tabs.Tab>
                <Tabs.Tab value="settings" icon={<IconSettings />}>Settings</Tabs.Tab>
                <Tabs.Tab value="archived" disabled>Archived</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="overview"><Text>Overview panel content.</Text></Tabs.Panel>
              <Tabs.Panel value="activity"><Text>Activity panel content.</Text></Tabs.Panel>
              <Tabs.Panel value="settings"><Text>Settings panel content.</Text></Tabs.Panel>
            </Tabs>
          </div>

          <div>
            <Text variant="h200-caps" color="subtlest">variant="underline"</Text>
            <Tabs defaultValue="activity" variant="underline">
              <Tabs.List aria-label="Document sections (underline)">
                <Tabs.Tab value="overview" count={2}>Overview</Tabs.Tab>
                <Tabs.Tab value="activity" count={12}>Activity</Tabs.Tab>
                <Tabs.Tab value="settings">Settings</Tabs.Tab>
                <Tabs.Tab value="archived" disabled>Archived</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="overview"><Text>Overview panel content.</Text></Tabs.Panel>
              <Tabs.Panel value="activity"><Text>Activity panel content.</Text></Tabs.Panel>
              <Tabs.Panel value="settings"><Text>Settings panel content.</Text></Tabs.Panel>
            </Tabs>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-200)', alignItems: 'center', marginTop: 'var(--space-400)' }}>
          <Avatar name="Serhii Arkhipov" size="sm" />
          <Avatar name="Liga Zakon" size="md" />
          <Avatar name="Design System" size="lg" />
          <Avatar name="No Name" size="xl" square />
          <Avatar size="lg" />
        </div>
      </section>

      <section style={{ marginTop: 'var(--space-800)', maxWidth: 560 }}>
        <Heading level={3} style={{ marginBottom: 'var(--space-300)' }}>
          Components · Table
        </Heading>
        <Table caption="Team members" zebra hoverable>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell sortable sortDirection="ascending" onSort={() => {}}>Name</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Serhii Arkhipov</Table.Cell>
              <Table.Cell>Admin</Table.Cell>
              <Table.Cell><Badge tone="success" variant="subtle">Active</Badge></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Olena Petrenko</Table.Cell>
              <Table.Cell>Editor</Table.Cell>
              <Table.Cell><Badge tone="warning" variant="subtle">Pending</Badge></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Ivan Kovalenko</Table.Cell>
              <Table.Cell>Viewer</Table.Cell>
              <Table.Cell><Badge tone="neutral" variant="subtle">Inactive</Badge></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </section>

      <section style={{ marginTop: 'var(--space-800)' }}>
        <Heading level={3} style={{ marginBottom: 'var(--space-300)' }}>
          Components · Menu · DatePicker
        </Heading>
        <div style={{ display: 'flex', gap: 'var(--space-400)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Menu trigger={<Button variant="secondary" rightIcon={<PlusIcon />}>Actions</Button>}>
            <Menu.Item icon={<PlusIcon />} onSelect={() => {}}>Edit</Menu.Item>
            <Menu.Item onSelect={() => {}}>Duplicate</Menu.Item>
            <Menu.Separator />
            <Menu.Item danger onSelect={() => {}}>Delete</Menu.Item>
          </Menu>
          <div style={{ width: 220 }}>
            <DatePicker aria-label="Date" defaultValue={new Date(2026, 5, 2)} />
          </div>
        </div>
      </section>

      <section style={{ marginTop: 'var(--space-800)' }}>
        <Heading level={3} style={{ marginBottom: 'var(--space-300)' }}>
          Components · Breadcrumbs · Pagination
        </Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-400)' }}>
          <Breadcrumbs>
            <Breadcrumbs.Item href="#" icon={<IconFolder />}>Home</Breadcrumbs.Item>
            <Breadcrumbs.Item href="#">Documents</Breadcrumbs.Item>
            <Breadcrumbs.Item href="#">2026</Breadcrumbs.Item>
            <Breadcrumbs.Item current>Q2 report</Breadcrumbs.Item>
          </Breadcrumbs>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-200)' }}>
            <Pagination count={7} defaultPage={1} aria-label="Short pagination" />
            <Pagination
              count={20}
              page={page}
              onPageChange={setPage}
              aria-label="Long controlled pagination"
            />
            <Text color="subtle">Current page: {page}</Text>
            <Pagination count={9} defaultPage={4} size="sm" aria-label="Small pagination" />
          </div>
        </div>
      </section>

      <section style={{ marginTop: 'var(--space-800)' }}>
        <Heading level={3} style={{ marginBottom: 'var(--space-200)' }}>
          @liga360/icons (Liga360) — 459 icons
        </Heading>
        <Text color="subtle">Sample below. Icons are 1em + currentColor — they inherit size & brand color.</Text>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
            gap: 'var(--space-200)',
            margin: 'var(--space-300) 0',
            fontSize: 24,
            color: 'var(--text-default)',
          }}
        >
          {SAMPLE_ICONS.map(([name, Ic]) => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <Ic />
              <code style={{ fontSize: 10, color: 'var(--text-subtlest)', textAlign: 'center' }}>{name}</code>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-400)', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 28, color: 'var(--text-accent)' }}><IconStarFavoriteFilled /></span>
          <span style={{ fontSize: 28, color: 'var(--text-danger)' }}><IconTrash /></span>
          <span style={{ fontSize: 28, color: 'var(--text-success)' }}><IconCheck /></span>
          <Button leftIcon={<IconAdd />}>Add document</Button>
          <Button variant="secondary" leftIcon={<IconDownload />}>Export</Button>
          <div style={{ width: 240 }}>
            <Input leftIcon={<IconSearch />} placeholder="Search with a real icon" />
          </div>
        </div>
      </section>
    </div>
  );
}
