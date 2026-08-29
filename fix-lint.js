/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

function replaceAll(filepath, replacements) {
    if (!fs.existsSync(filepath)) return;
    let content = fs.readFileSync(filepath, 'utf8');
    for (const [oldStr, newStr] of replacements) {
        content = content.split(oldStr).join(newStr);
    }
    fs.writeFileSync(filepath, content, 'utf8');
}

replaceAll('src/components/dashboard/settings/notifications-form.tsx', [
    ['function onSubmit(data: z.infer<typeof notificationsFormSchema>)', 'function onSubmit(_data: z.infer<typeof notificationsFormSchema>)']
]);

replaceAll('src/components/dashboard/settings/privacy-form.tsx', [
    ['function onSubmit(data: z.infer<typeof privacyFormSchema>)', 'function onSubmit(_data: z.infer<typeof privacyFormSchema>)']
]);

replaceAll('src/components/marketing/landing-page.tsx', [
    ['Array.from({ length: 6 }).map((_, i)', 'Array.from({ length: 6 }).map((_, _i)'],
    ['<img \n                        src={`https://ui-avatars.com', '{/* eslint-disable-next-line @next/next/no-img-element */}\n                      <img \n                        src={`https://ui-avatars.com'],
    ['<img src={`https://api.dicebear.com', '{/* eslint-disable-next-line @next/next/no-img-element */}\n                    <img src={`https://api.dicebear.com'],
    ["we've", "we&apos;ve"],
    ["It's", "It&apos;s"],
    ['"Professional"', "&quot;Professional&quot;"],
    ['"Standard"', "&quot;Standard&quot;"],
    ['import Image from "next/image";', '']
]);

replaceAll('src/core/storage/local-storage-provider.ts', [
    ['contentType?: string,', '_contentType?: string,']
]);

console.log('Done');
