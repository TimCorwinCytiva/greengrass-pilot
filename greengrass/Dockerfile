FROM alpine:3.12

# Set ENV_VAR for Greengrass RC to be untarred inside Docker Image
ARG GREENGRASS_RELEASE_URL=https://d1onfpft10uf5o.cloudfront.net/greengrass-core/downloads/1.11.4/greengrass-linux-x86-64-1.11.4.tar.gz

# Install Greengrass Core Dependencies
RUN apk add --no-cache tar gzip wget xz shadow libc6-compat ca-certificates iproute2 python2 python3 openjdk8 nodejs-current && \
    #ln -s /usr/bin/python3.8 r/usr/bin/python3.7 && \
    ln -s /usr/bin/java /usr/local/bin/java8 && \
    wget $GREENGRASS_RELEASE_URL && \
    ln -s /usr/bin/node /usr/bin/nodejs12.x && \
    apk del wget

# Setup Greengrass inside Docker Image
RUN export GREENGRASS_RELEASE=$(basename $GREENGRASS_RELEASE_URL) && \
    tar xzf $GREENGRASS_RELEASE -C / && \
    rm $GREENGRASS_RELEASE && \
    useradd -r ggc_user && \
    groupadd -r ggc_group

# Copy static files
COPY "greengrass-entrypoint.sh" /
COPY "greengrass-config.js" /
COPY "base.config.json" /
COPY "root.ca.pem" /greengrass/certs/

# Prepare container for Sitewise etc
RUN chmod +x greengrass-entrypoint.sh

# Expose 8883 to pub/sub MQTT messages
EXPOSE 8883

#########
ENV GG_HOST="greengrass-ats.iot.us-east-1.amazonaws.com" \
 IOT_HOST="****.iot.us-east-1.amazonaws.com" \
 THING_ARN="arn:aws:iot:us-east-1:****" \
 CERT="BASE64 cert goes here" \
 PRIVATE_KEY="BASE64 Private Key goes here" 
#########


ENTRYPOINT [  "/greengrass-entrypoint.sh" ]