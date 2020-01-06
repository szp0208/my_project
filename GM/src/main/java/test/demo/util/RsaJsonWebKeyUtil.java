//package test.demo.util;
//
//import org.jose4j.jwk.RsaJsonWebKey;
//import org.jose4j.jwk.RsaJwkGenerator;
//import org.jose4j.lang.JoseException;
//
//public class RsaJsonWebKeyUtil {
//    public static RsaJsonWebKey rsaJsonWebKey = null;
//
//    private RsaJsonWebKeyUtil() {
//    }
//    public static RsaJsonWebKey getInstance() {
//        // 生成一个RSA密钥对，用于签署和验证JWT，包装在JWK中
//        if (rsaJsonWebKey == null) {
//            try {
//                rsaJsonWebKey = RsaJwkGenerator.generateJwk(2048);
//                rsaJsonWebKey.setKeyId("jwt1");
//            } catch (JoseException e) {
//                e.printStackTrace();
//            }
//        }
//        // 给JWK一个关键ID（kid），这是礼貌的做法
//        return rsaJsonWebKey;
//    }
//}