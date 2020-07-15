<script>
  // @ts-check
  import { url, layout } from "@sveltech/routify";
  import { format, formatRelative, parseISO } from "date-fns";
  import marked from "marked";

  const posts = $layout.parent.children
    .filter((c) => c.meta["frontmatter"])
    .sort((a, b) => b.meta["frontmatter"].published.localeCompare(a.meta["frontmatter"].published));
</script>

<h1>Blog</h1>

<ul class="posts">
  {#each posts as node}
    <li class="card">
      <a class="title" href={$url(node.path)}>{node.meta.frontmatter.title}</a>
      {@html marked(node.meta.frontmatter.summary)}
    </li>
  {/each}
</ul>
