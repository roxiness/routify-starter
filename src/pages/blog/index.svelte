<script>
  import { url, layout } from "@sveltech/routify";
  import marked from "marked";

  const posts = $layout.parent.children
    .filter((c) => c.meta["frontmatter"])
    .sort((a, b) => b.meta["frontmatter"].published.localeCompare(a.meta["frontmatter"].published));
</script>

<h1>Blog</h1>

<ul class="posts">
  {#each posts as {meta, path}}
    <li class="card">
      <a class="title" href={$url(path)}>{meta.frontmatter.title}</a>
      {@html marked(meta.frontmatter.summary)}
    </li>
  {/each}
</ul>
