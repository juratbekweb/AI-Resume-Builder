import os

files = {
    'src/components/dashboard/settings/notifications-form.tsx': [
        ('function onSubmit(data: z.infer<typeof notificationsFormSchema>)', 'function onSubmit(_data: z.infer<typeof notificationsFormSchema>)')
    ],
    'src/components/dashboard/settings/privacy-form.tsx': [
        ('function onSubmit(data: z.infer<typeof privacyFormSchema>)', 'function onSubmit(_data: z.infer<typeof privacyFormSchema>)')
    ],
    'src/components/marketing/landing-page.tsx': [
        ('Array.from({ length: 6 }).map((_, i)', 'Array.from({ length: 6 }).map((_, _i)'),
        ('<img \n                        src={`https://ui-avatars.com', '{/* eslint-disable-next-line @next/next/no-img-element */}\n                      <img \n                        src={`https://ui-avatars.com'),
        ('<img src={`https://api.dicebear.com', '{/* eslint-disable-next-line @next/next/no-img-element */}\n                    <img src={`https://api.dicebear.com'),
        ("we've", "we&apos;ve"),
        ("It's", "It&apos;s"),
        ('"Professional"', "&quot;Professional&quot;"),
        ('"Standard"', "&quot;Standard&quot;")
    ],
    'src/core/storage/local-storage-provider.ts': [
        ('contentType?: string,', '_contentType?: string,')
    ]
}

for path, replacements in files.items():
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        for old, new in replacements:
            content = content.replace(old, new)
            
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
