FROM bochuxt/nginx-modsecurity-1.18-3.0:base1
#ubuntu:18.04
RUN apt-get update && \
	apt-get update -y && \
	apt-get install -y make && \
	apt-get install -y m4 && \
	apt-get install nano && \
	apt-get purge -y -f libxml2-dev && \
    apt-get update && \
    apt-get install -y libxml2 libxml2-dev && \
	apt install -y build-essential git tree && \
	apt-get install -y wget tar apt-utils autoconf automake build-essential git libcurl4-openssl-dev libgeoip-dev liblmdb-dev libpcre++-dev libtool libxml2-dev libssl-dev libyajl-dev pkgconf zlib1g-dev && \
	git clone --depth 1 -b v3/master --single-branch https://github.com/SpiderLabs/ModSecurity && \
	cd ModSecurity && \
	git submodule init && \
	git submodule update && \
	./build.sh && \
	./configure && \
	make && \
	make install && \
	cd / && \
	git clone --depth 1 https://github.com/SpiderLabs/ModSecurity-nginx.git && \
	wget http://nginx.org/download/nginx-1.18.0.tar.gz && \
	tar zxvf nginx-1.18.0.tar.gz && \
	cd nginx-1.18.0 && \
	./configure  --user=root --group=root --with-debug --with-ipv6 --with-http_ssl_module  --with-compat --add-module=/ModSecurity-nginx --without-http_access_module --without-http_auth_basic_module --without-http_autoindex_module --without-http_empty_gif_module --without-http_fastcgi_module --without-http_referer_module --without-http_memcached_module --without-http_scgi_module --without-http_split_clients_module --without-http_ssi_module --without-http_uwsgi_module && \
	make && \
	make install && \
	cd / && \
	git clone https://github.com/SpiderLabs/owasp-modsecurity-crs.git /usr/src/owasp-modsecurity-crs && \
	cp -R /usr/src/owasp-modsecurity-crs/rules/ /usr/local/nginx/conf/  && \
	mv /usr/local/nginx/conf/rules/REQUEST-900-EXCLUSION-RULES-BEFORE-CRS.conf.example  /usr/local/nginx/conf/rules/REQUEST-900-EXCLUSION-RULES-BEFORE-CRS.conf && \
	mv /usr/local/nginx/conf/rules/RESPONSE-999-EXCLUSION-RULES-AFTER-CRS.conf.example  /usr/local/nginx/conf/rules/RESPONSE-999-EXCLUSION-RULES-AFTER-CRS.conf && \
	apt-get remove -y --purge apt-utils autoconf automake build-essential git pkgconf && \
	apt-get autoremove -y 
RUN cp /nginx-1.18.0/conf/mime.types /usr/local/nginx/mime.types 
RUN cp /ModSecurity/unicode.mapping /usr/local/nginx/unicode.mapping
RUN cp -R /usr/local/nginx/conf/rules /usr/local/nginx/
COPY nginx.conf /usr/local/nginx/nginx.conf
COPY modsec_includes.conf /usr/local/nginx/modsec_includes.conf
COPY modsecurity.conf /usr/local/nginx/modsecurity.conf
#COPY crs-setup.conf /usr/local/nginx/crs-setup.conf 
COPY crs-setup.conf /usr/local/nginx/rules/crs-setup.conf  
CMD  cd /usr/local/nginx && ./sbin/nginx -c /usr/local/nginx/nginx.conf   -g  'daemon off;'
EXPOSE 80
	
	
	
	
	