set -e

until curl --silent --fail "$ELASTICSEARCH_URL/_cluster/health?wait_for_status=yellow&timeout=10s" > /dev/null; do
  >&2 echo "Elasticsearch is unavailable - sleeping"
  sleep 5
done

>&2 echo "Elasticsearch is up - executing command"
exec "$@" 