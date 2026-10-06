#!/usr/bin/env bash
# Switch the site from the GitHub Pages preview to www.jakesdetailing.ca.
#
# Run this ONLY after Jake has changed his records at GoDaddy:
#   A     @    185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
#   CNAME www  nradachy-web.github.io
# (replacing the Wix records: A @ 185.230.63.107 and CNAME www pointing.wixdns.net)
#
# Order matters. GitHub only issues the HTTPS certificate once its own DNS
# check passes, and it caches what it saw. Setting the custom domain while the
# old records are still live stalls the certificate for up to the old TTL (this
# cost a day on another launch). So: DNS first, then this script. It refuses to
# run until GoDaddy's own nameservers answer with GitHub's addresses.
set -euo pipefail

DOMAIN="www.jakesdetailing.ca"
APEX="jakesdetailing.ca"
REPO="nradachy-web/jakes-car-detailing"
WANT_A="185.199.108.153 185.199.109.153 185.199.110.153 185.199.111.153 "

cd "$(dirname "$0")/.."

for ns in ns37.domaincontrol.com ns38.domaincontrol.com; do
  cname="$(dig +short CNAME "$DOMAIN" @"$ns" | tr 'A-Z' 'a-z')"
  a="$(dig +short A "$APEX" @"$ns" | sort | tr '\n' ' ')"
  if [ "$cname" != "nradachy-web.github.io." ] || [ "$a" != "$WANT_A" ]; then
    echo "Not yet. $ns answers: www -> '${cname:-none}', apex -> '${a:-none}'"
    echo "Nothing was changed."
    exit 1
  fi
done
echo "GoDaddy's nameservers point at GitHub."

if [ -n "$(git status --porcelain)" ]; then
  echo "Working tree is not clean. Commit or stash first. Nothing was changed."
  exit 1
fi

# 1. Production build: no base path (which also turns indexing on), CNAME file.
python3 - <<'PY'
import re
p = ".github/workflows/deploy.yml"
s = open(p).read()
s2 = re.sub(r"\n[ ]*# preview-start.*?# preview-end\n", "\n", s, flags=re.S)
if s2 == s:
    raise SystemExit("preview block not found in deploy.yml")
open(p, "w").write(s2)
PY
printf '%s\n' "$DOMAIN" > public/CNAME
git add -A
git commit -q -m "Go live on $DOMAIN"
git push -q origin main
echo "Pushed the production build."

# 2. Register the custom domain. With an Actions deploy the CNAME file alone
#    does not do this.
gh api -X PUT "repos/$REPO/pages" -f cname="$DOMAIN" >/dev/null
echo "Custom domain set to $DOMAIN."

# 3. Wait for the deploy.
sleep 8
run="$(gh run list --repo "$REPO" --limit 1 --json databaseId --jq '.[0].databaseId')"
gh run watch "$run" --repo "$REPO" --exit-status --interval 10 >/dev/null
echo "Deploy finished."

# 4. Wait for the certificate, then force HTTPS.
for i in $(seq 1 40); do
  if curl -s -o /dev/null -m 10 "https://$DOMAIN/" && curl -s -o /dev/null -m 10 "https://$APEX/"; then
    gh api -X PUT "repos/$REPO/pages" -F https_enforced=true >/dev/null
    echo "Certificate is live and HTTPS is enforced: https://$DOMAIN/"
    exit 0
  fi
  sleep 30
done

echo "The site is up over http, but the certificate has not arrived after 20 minutes."
echo "Check: gh api repos/$REPO/pages/health"
echo "If both hosts show is_https_eligible true, remove and re-add the custom domain ONCE:"
echo "  gh api -X PUT repos/$REPO/pages -f cname=''   then   gh api -X PUT repos/$REPO/pages -f cname=$DOMAIN"
echo "then: gh api -X PUT repos/$REPO/pages -F https_enforced=true"
exit 2
