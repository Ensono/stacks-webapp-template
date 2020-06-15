import {createClient} from "contentful"

const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
})

const previewClient = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    host: "preview.contentful.com",
})

const getClient = preview => (preview ? previewClient : client)

function parseAuthor({fields}) {
    return {
        name: fields.name,
        picture: fields.picture.fields.file,
    }
}

function parsePost({fields, sys}) {
    return {
        title: fields.title,
        slug: fields.slug,
        date: fields.date,
        content: fields.content,
        excerpt: fields.excerpt,
        coverImage: fields.coverImage.fields.file,
        author: parseAuthor(fields.author),
        id: sys.id,
        locale: sys.locale,
    }
}

function parsePostEntries(entries, cb = parsePost) {
    return entries?.items?.map(cb)
}

export async function getLanguages() {
    const lang = await client.getLocales()
    return lang
}

export async function getPreviewPostBySlug(slug) {
    const entries = await getClient(false).getEntries({
        content_type: "post",
        limit: 1,
        "fields.slug[in]": slug,
    })
    return parsePostEntries(entries)[0]
}

export async function getAllPostsWithSlug() {
    const entries = await client.getEntries({
        content_type: "post",
        select: "fields.slug",
        locale: "*",
    })
    console.info("getAllPostsWithSlug::::", entries.items[0])
    return parsePostEntries(entries, post => post.fields.slug)
}

export async function getAllPostsForHome(preview) {
    const entries = await getClient(preview).getEntries({
        content_type: "post",
        order: "-fields.date",
    })
    return parsePostEntries(entries)
}

export async function getPost(slug, locale) {
    const entry = await client.getEntries({
        content_type: "post",
        limit: 1,
        "fields.slug[in]": slug,
        locale,
    })

    return {
        post: parsePostEntries(entry)[0],
    }
}
